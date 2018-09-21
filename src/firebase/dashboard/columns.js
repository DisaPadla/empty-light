import { columnsRef } from "../";

export const watchColumns = cb => {
  return columnsRef.orderByChild("order").on("value", snapshot => {
    const data = [];
    snapshot.forEach(item => {
      data.push({ ...item.val(), id: item.key });
    });
    cb({
      columns: data
    });
  });
};

export const updateColumn = column =>
  columnsRef.child(column.id).update(column);

export const addColumn = column => {
  const newColumnRef = columnsRef.push();
  const key = newColumnRef.key;
  newColumnRef.set({ ...column, id: key });
};

export const unwatchColumns = () => columnsRef.off();
