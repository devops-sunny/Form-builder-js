import * as React from 'react';
import { createPortal } from 'react-dom';
import { customAlphabet } from 'nanoid';
import { Grid } from '@mui/material';
import {
  rectIntersection,
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
  defaultDropAnimation,
  DragOverlay,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import EditorPanel from '../EditorPanel';
import FieldItem from '../FieldItem';
import Section from '../Section';
import EmptySection from '../Section/EmptySection';
import SectionsWrapper from '../Section/SectionsWrapper';

import DraggableCard from '../Dragndrop/DraggableCard';
import SortableItem from '../Dragndrop/SortableItem';
import DroppableContainer from '../Dragndrop/DroppableContainer';
import DroppableContainerWrapper from '../Dragndrop/DroppableContainerWrapper';

import { LayersIcon } from '../../icons';


export default function Builder({
  isFieldDisabled,
  preview,
  lastTimeChanged,
  templateCreationTime,
  templateData,
  setTemplateData,
  dataSectionItems,
  setDataSectionItems,
  dataSectionContainers,
  setDataSectionContainers,
  customFields,
  fieldsItems,
  setFieldsItems,
  customSections,
}) {
  // nanoid
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);
  // Cloned items are using for reverting data in case of dnd cancellation
  const [clonedDataSectionItems, setClonedDataSectionItems] = React.useState(null);
  const [activeId, setActiveId] = React.useState({ sectionId: null, cardId: null, dragId: null });
  const lastOverId = React.useRef(null);
  const recentlyMovedToNewContainer = React.useRef(false);
  const isSortingContainer = activeId.dragId ? dataSectionContainers.includes(activeId.dragId) : false;

  React.useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [dataSectionItems]);

  const handleAddSection = () => {
    const newContainerId = nanoid();
    setDataSectionContainers((containers) => [...containers, newContainerId]);
    setDataSectionItems((items) => ({
      ...items,
      [newContainerId]: {
        id: nanoid(),
        title: `Untitled section`,
        isTitleVisibleOnTheFinalDocument: false,
        items: [],
      },
    }));
    return newContainerId;
  };

  const findContainer = (id) => {
    if (id in dataSectionItems) 
      return id
    

    return Object.keys(dataSectionItems).find((key) =>
      dataSectionItems[key].items.map((x) => x.id).includes(id)
    );
  };

  // Custom collision detection strategy optimized for multiple containers
  const collisionDetectionStrategy = React.useCallback(
    (args) => {
      //Start by finding any intersecting droppable
      let overId = rectIntersection(args);
      if (activeId.dragId && activeId.dragId in dataSectionItems) 
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in dataSectionItems
          ),
        });
      
      if (overId != null) {
        if (overId in dataSectionItems) {
          const containerItems = dataSectionItems[overId];
          // If a container is matched and it contains items (e.g. columns 'Offer data', 'Insurance', 'Transportation')
          if (containerItems.length > 0) 
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter((container) =>
                container.id !== overId && containerItems.includes(container.id)
              ),
            });
          
        }
        lastOverId.current = overId;
        return overId;
      }
      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) 
        lastOverId.current = activeId.dragId;
      
      // If no droppable is matched, return the last match
      return lastOverId.current;
    },
    [activeId.dragId, dataSectionItems]
  );

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <DndContext
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={({ active }) => {
        setActiveId((ids) => ({ ...ids, dragId: active.id }));
        setClonedDataSectionItems(dataSectionItems);
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id;

        if (!overId || active.id in dataSectionItems) 
          return;
        
        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if(['logo', 'bg'].includes(dataSectionItems[overContainer]?.subModel)) 
          return;
        
        if ((active.id in fieldsItems || active.id in customFields) && overContainer && !activeContainer) {
          /*eslint no-param-reassign: ["error", { "props": false }]*/
          // description in DraggbleWrapper.jsx
          const originalType = active.id;
          active.id = active.data.current.id
          setDataSectionItems((items) => ({
            ...items,
            [overContainer]: {
              ...items[overContainer],
              items: [
                ...items[overContainer].items,
                {
                  ...(originalType in customFields ? customFields[originalType] : fieldsItems[originalType]),
                  id: active.data.current.id,
                }
              ],
            }
          }));
        }

        if (!overContainer || !activeContainer) 
          return;
        
        if (activeContainer !== overContainer)
          setDataSectionItems((items) => {
            const activeItems = items[activeContainer].items.map((x) => x.id);
            const overItems = items[overContainer].items.map((x) => x.id);
            // Give new positions to items by index while dragging
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex;

            if (overId in items) 
              newIndex = overItems.length + 1;
            else {
              const isBelowOverItem = over
                    && active.rect.current.translated
                    && active.rect.current.translated.offsetTop
                    > over.rect.offsetTop + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex
                = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            return {
              ...items,
              [activeContainer]: {
                ...items[activeContainer],
                isActive: false,
                items: items[activeContainer].items.filter(
                  (item) => item.id !== active.id
                ),
              },
              [overContainer]: {
                ...items[overContainer],
                isActive: true,
                items: [
                  ...items[overContainer].items.slice(0, newIndex),
                  items[activeContainer].items[activeIndex],
                  ...items[overContainer].items.slice(
                    newIndex,
                    items[overContainer].items.length
                  ),
                ],
              }
            };
          });
        
      }}
      onDragEnd={({ active, over }) => {
        const overId = over?.id;
        const originalType = active.id;

        if ((active.id in fieldsItems || active.id in customFields) && active.data.current.id) 
          /*eslint no-param-reassign: ["error", { "props": false }]*/
          active.id = active.data.current.id
        
        if (!overId) {
          setActiveId((ids) => ({ ...ids, dragId: null }));
          return;
        }
        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (over && !activeContainer && over.id === 'droppableWrapper') {
          // Add field item to the container
          if (active?.data.current?.model === 'section') {
            setDataSectionContainers((containers) => [...containers, active.data.current.id]);
            setDataSectionItems((items) => ({
              ...items,
              [active.data.current.id]: {
                ...customSections[active.data.current.type],
              }
            }));
          }
          //or create new container if item dragged to the empty screen
          if (active?.data.current?.model === 'card') {
            const newSectionId = handleAddSection();
            setDataSectionItems((items) => ({
              ...items,
              [newSectionId]: {
                ...items[newSectionId],
                items: [
                  ...items[newSectionId].items,
                  {
                    ...(originalType in customFields ? customFields[originalType] : fieldsItems[originalType]),
                    id: nanoid(),
                  }
                ],
              }
            }));
          }
        }

        if (active.id in dataSectionItems && over?.id) {
          setDataSectionContainers((containers) => {
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);

            return arrayMove(containers, activeIndex, overIndex);
          });
          setDataSectionItems((c) => {
            const containers = Object.keys(c);
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);

            return Object.fromEntries(arrayMove(Object.entries(c), activeIndex, overIndex));
          });
        }


        if (!activeContainer) {
          setActiveId((ids) => ({ ...ids, dragId: null }));
          return;
        }

        if (overContainer && !['logo', 'bg'].includes(dataSectionItems[overContainer]?.subModel)) {
          const activeIndex = dataSectionItems[activeContainer].items.map((x) => x.id).indexOf(active.id);
          const overIndex = dataSectionItems[overContainer].items.map((x) => x.id).indexOf(overId);

          if (activeIndex !== overIndex) 
            setDataSectionItems((items) => ({
              ...items,
              [overContainer]: {
                ...items[overContainer],
                items: arrayMove(
                  items[overContainer].items,
                  activeIndex,
                  overIndex
                ),
              },
            }));
          
        }

        setActiveId((ids) => ({ ...ids, dragId: null }));
      }}
      onDragCancel={() => {
        if (clonedDataSectionItems) 
          // Reset items to their original state in case items have been
          // Dragged across containrs
          setDataSectionItems(clonedDataSectionItems);
        
        setActiveId((ids) => ({ ...ids, dragId: null }));
        setClonedDataSectionItems(null);
      }}>
      <Grid container item xs>
        <EditorPanel
          preview={preview}
          lastTimeChanged={lastTimeChanged}
          templateCreationTime={templateCreationTime}
          handleAddSection={handleAddSection}
          templateData={templateData}
          setTemplateData={setTemplateData}
          customSections={customSections}
          customFields={customFields}
          fieldsItems={fieldsItems}
          dataSectionItems={Object.entries(dataSectionItems).filter((k) => !dataSectionContainers.includes(k[0]))}
          setFieldsItems={setFieldsItems}
        />
        <DroppableContainerWrapper element={SectionsWrapper} xs item>
          {!dataSectionContainers.length && (<EmptySection/>)}
          <SortableContext items={dataSectionContainers}>
            {dataSectionContainers.map((containerId) =>
              <DroppableContainer
                key={containerId}
                element={Section}
                id={containerId}
                activeId={activeId}
                dataSectionItems={dataSectionItems}
                primaryLang={templateData.primaryLang}
                setActiveId={setActiveId}
                setDataSectionItems={setDataSectionItems}
                setDataSectionContainers={setDataSectionContainers}
                items={[...dataSectionItems[containerId].items]}>
                <SortableContext items={dataSectionItems[containerId].items.map((v) => v.id)}>
                  {dataSectionItems[containerId].items.map((v) => (
                    <SortableItem
                      {...v}
                      key={v.id}
                      element={FieldItem}
                      preview={preview}
                      isFieldDisabled={isFieldDisabled}
                      setActiveId={setActiveId}
                      containerId={containerId}
                      fieldsItems={fieldsItems}
                      templateData={templateData}
                      dataSectionItems={dataSectionItems}
                      setDataSectionItems={setDataSectionItems}
                      isSorting={activeId.dragId}
                      disabled={isSortingContainer} />
                  ))}
                </SortableContext>
              </DroppableContainer>
            )}
          </SortableContext>
        </DroppableContainerWrapper>
      </Grid>
      {/* TODO more sophisticated dnd overlay */}
      {createPortal(
        <DragOverlay
          adjustScale={false}
          dropAnimation={{
            ...defaultDropAnimation,
            dragSourceOpacity: 0.5,
          }}>
          {dataSectionContainers.includes(activeId.dragId)
            ? (<DroppableContainer
              element={Section}
              id={activeId.dragId}
              primaryLang={templateData.primaryLang}
              activeId={activeId}
              setActiveId={setActiveId}
              dataSectionItems={dataSectionItems}
              setDataSectionItems={setDataSectionItems}
              setDataSectionContainers={setDataSectionContainers}>
              Section placement
            </DroppableContainer>)
            : (
              <DraggableCard disableRipple startIcon={<LayersIcon />}>
               Field placement
              </DraggableCard>
            )
          }
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
