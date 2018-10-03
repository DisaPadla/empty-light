const DEFAULT_ORDER = 2048;

const shiftOrderUp = (destinationItem, nextDestinationItem) => {
  return (
    (nextDestinationItem.order - destinationItem.order) / 2 +
    destinationItem.order
  );
};

const shiftOrderDown = (destinationItem, prevDestinationItem) => {
  return (
    (destinationItem.order - prevDestinationItem.order) / 2 +
    prevDestinationItem.order
  );
};

export const calculateOrder = ({ destination, source }, items) => {
  const destinationItem =
    items[destination.index] || items[destination.index - 1];
  const isSameCol = destination.droppableId === source.droppableId;
  const prevDestinationItem = items[destination.index - 1];
  if (destination.index <= 0) {
    return destinationItem ? destinationItem.order / 2 : DEFAULT_ORDER;
  }

  if (isSameCol && destination.index >= items.length - 1) {
    return destinationItem.order * 2;
  }

  if (!isSameCol && destination.index === items.length) {
    return destinationItem.order * 2;
  }

  if (isSameCol) {
    const nextDestinationItem = items[destination.index + 1];
    return destination.index > source.index
      ? shiftOrderUp(destinationItem, nextDestinationItem)
      : shiftOrderDown(destinationItem, prevDestinationItem);
  }
  return shiftOrderDown(destinationItem, prevDestinationItem);
};
