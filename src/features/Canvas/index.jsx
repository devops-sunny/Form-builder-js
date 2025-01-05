import * as React from 'react';

// eslint-disable-next-line react/display-name
export default React.forwardRef(({ width, height, color = 'black', isClear, setIsClear }, ref) => {
  const canvasRef = ref;
  const [isPainting, setIsPainting] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState(undefined);

  const getCoordinates = (event) => {
    if (!canvasRef.current) 
      return {};
    
    const canvas = canvasRef.current;
    // parent offset used for corrent mouse position wwith modal window
    return { x: event.pageX - canvas.offsetLeft - canvas.offsetParent.offsetLeft, y: event.pageY - canvas.offsetTop - canvas.offsetParent.offsetTop };
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    setIsClear(false);
  }, [isClear]);


  const drawLine = (originalMousePosition, newMousePosition) => {
    if (!canvasRef.current) 
      return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = color;
      context.lineJoin = 'round';
      context.lineWidth = 3;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };


  const startPaint = React.useCallback((event) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  React.useEffect(() => {
    if (!canvasRef.current) 
      return {};
    
    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);

  const paint = React.useCallback(
    (event) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  React.useEffect(() => {
    if (!canvasRef.current) 
      return {};
    
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  const exitPaint = React.useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  React.useEffect(() => {
    if (!canvasRef.current) 
      return {};
    
    const canvas = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  return <canvas ref={canvasRef} height={height} width={width} />;
});
