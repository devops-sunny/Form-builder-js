import * as React from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CSS } from "@dnd-kit/utilities";
import SectionMenu from "./SectionMenu";
import SubModelSection from "./SubModelSection";
import { SettingsIcon, DndIcon } from "../../icons";

const StyledSection = styled(Paper)(({ theme, transform, transition }) => ({
  transition,
  transform: CSS.Translate.toString(transform),
  backgroundColor: theme.palette.light.main,
  borderRadius: "8px",
  boxShadow: "0px 2px 13px 0px #00000005",
  maxWidth: 986,
  margin: "10px auto",
  "& .hidden-button": {
    visibility: "hidden",
    opacity: 0,
    transition: `visibility ${theme.transitions.duration.leavingScreen}ms, opacity ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeOut}`
  },
  "&:hover": {
    ".hidden-button": {
      visibility: "visible",
      opacity: 1
    },
    boxShadow: "0px 2px 13px 0px #00000015"
  },
  "& .fb-section-header": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "2px 10px 2px 16px",
    boxShadow: theme.shadow.divider.bottom,
    "& .MuiTypography-root": {
      marginRight: "auto"
    }
  }
}));

const Section = React.forwardRef(
  (
    {
      children,
      handleProps,
      isDragging,
      containerId,
      setActiveId,
      activeId,
      primaryLang,
      dataSectionItems,
      setDataSectionItems,
      setDataSectionContainers,
      isOverContainer,
      onClick,
      ...props
    },
    ref
  ) => {
    const currentSection = dataSectionItems[containerId];

    const activeItemsSelector = React.useMemo(
      () =>
        Object.fromEntries(
          Object.entries(dataSectionItems).map(([cid, c]) => [
            cid,
            cid === activeId.sectionId
              ? {
                ...c,
                isActive: true,
                items: c.items.map((item) => ({
                  ...item,
                  isActive: item.id === activeId.cardId
                }))
              }
              : {
                ...c,
                isActive: false,
                items: c.items.map((item) => ({ ...item, isActive: false }))
              }
          ])
        ),
      [dataSectionItems, activeId.sectionId, activeId.cardId]
    );

    const isSelectedField = React.useMemo(
      () => currentSection.items.some((o) => o.isActive === true),
      [currentSection.items]
    );

    React.useEffect(() => {
      //TODO refactoring
      // don't use useEffect for setter
      //console.count('Section memorized activeItemsSelector useEffect rerender: ')
      setDataSectionItems(activeItemsSelector);
    }, [activeId.sectionId, activeId.cardId]);

    const handleSectionClick = React.useCallback((e) => {
      e.stopPropagation();
      setActiveId((ids) => ({ ...ids, sectionId: containerId, cardId: null }));
    }, []);

    return (
      <StyledSection
        {...props}
        ref={ref}
        onClick={handleSectionClick}
        sx={{
          outline: (theme) =>
            (currentSection.isActive && !isSelectedField) || isOverContainer
              ? `1px solid ${theme.palette.secondary.main}`
              : "",
          opacity: isDragging ? 0.5 : undefined,
        }}
      >
        <Box>
          <Box className="fb-section-header">
            <Typography variant="h6">
              {!["bg", "logo"].includes(currentSection.subModel)
                && currentSection.title}
            </Typography>
            <SectionMenu
              containerId={containerId}
              primaryLang={primaryLang}
              currentSection={currentSection}
              setDataSectionItems={setDataSectionItems}
              setDataSectionContainers={setDataSectionContainers}
            >
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </SectionMenu>
            <IconButton
              disableRipple
              sx={{ cursor: isDragging ? "grabbing" : "grab" }}
              aria-label="dnd"
              {...handleProps}
            >
              <DndIcon />
            </IconButton>
          </Box>

          <SubModelSection currentSection={currentSection} />

          {!["bg", "logo"].includes(currentSection.subModel) && (
            <Box display="flex" flexDirection="column" sx={{ p: 3 }}>
              {children}
            </Box>
          )}
        </Box>
      </StyledSection>
    );
  }
);

Section.displayName = "FeaturesSection";

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(Element),
    PropTypes.instanceOf(Object)
  ]).isRequired,
  handleProps: PropTypes.instanceOf(Object).isRequired,
  isDragging: PropTypes.bool,
  containerId: PropTypes.string,
  setActiveId: PropTypes.func.isRequired,
  activeId: PropTypes.string,
  primaryLang: PropTypes.string,
  dataSectionItems: PropTypes.instanceOf(Object).isRequired,
  setDataSectionItems: PropTypes.func.isRequired,
  setDataSectionContainers: PropTypes.func.isRequired,
  isOverContainer: PropTypes.bool,
  onClick: PropTypes.func
};
Section.defaultProps = {
  isDragging: undefined,
  containerId: undefined,
  activeId: undefined,
  primaryLang: undefined,
  isOverContainer: undefined,
  onClick: undefined
};

export default Section;
