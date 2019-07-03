const list = [1, 2, 3, 4, 5];

function dragDone(arr, { source, target }) {
  let list = [...arr];
  let temp = list.splice(source, 1);
  // 截取开头到被交换位置的元素
  let start = list.splice(0, target);
  return [...start, ...temp, ...list];
}

console.log(dragDone(list, { source: 0, target: 1 }));
console.log(dragDone(list, { source: 4, target: 0 }));
console.log(dragDone(list, { source: 1, target: 1 }));
