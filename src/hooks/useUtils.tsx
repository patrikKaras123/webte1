import { columns } from "../types/Column";
import { Photo } from "../types/Photo";


const useUtils = () => {
  const findHint = (columns: columns[]) => {
    if (columns[1].items.length === 0) {
      return "Move some pieces to Flag section";
    } else if (columns[1].items.length > 0 && columns[0].items.length > 0) {
      return "Move everything to Flag section";
    } else {
      return "Correct order";
    }
  }

  const shuffler = () => {
    let shuffleData
    if (Math.random() < 0.33) {
      shuffleData = [1, 1, -2];
    } else if (Math.random() < 0.33) {
      shuffleData = [2, -1, -1];
    } else {
      shuffleData = [0, 1, -1];
    }

    return shuffleData
  }

  const solutionHandler = (columns: columns) => {
    let stringBuilder = "";
    let visited: boolean[] = [false, false, false];
    for (let i = 0; i < 3; i++) {
      if (columns.items[0].path.includes("Down") && !visited[2]) {
        stringBuilder += "Grab the first piece and drag to last place,";
        visited[2] = true;
      }
      if (columns.items[1].path.includes("Down") && !visited[2]) {
        stringBuilder += "Grab the second piece and drag to last place,";
        visited[2] = true;
      }
      if (columns.items[0].path.includes("Mid") && !visited[1]) {
        stringBuilder += "Grab the first piece and drag to second place,";
        visited[1] = true;
      }
      if (columns.items[2].path.includes("Mid") && !visited[1]) {
        stringBuilder += "Grab the last piece and drag to second place,";
        visited[1] = true;
      }
      if (columns.items[1].path.includes("Up") && !visited[0]) {
        stringBuilder += "Grab the second piece and drag to first place,";
        visited[0] = true;
      }
      if (columns.items[2].path.includes("Up") && !visited[0]) {
        stringBuilder += "Grab the last piece and drag to first place";
        visited[0] = true;
      }
    }
    return stringBuilder;
  }

  const generateNextFlag = (columns: columns[], len: number, data: Photo[]) => {
    const shuffleData = shuffler();
    const prevColumns = columns.map((prev: columns) => {
      prev.items = []
      return prev
    })

    for (let i = len; i < len + 3; i++) {
      prevColumns[0].items.push(data[i + shuffleData[0]])
      shuffleData.shift()
    }

    return prevColumns;
  }

  const numberChecker = (arr: any, number: Number) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === number) {
        return false;
      }
    }
    return true;
  }

  const reshuffleData = (data: any) => {
    let indexer: any = [];
    let newData = [];
    let idx = 0;

    for (let i = 0; i < data.length / 3; i++) {
      while (1) {
        idx = Math.floor(Math.random() * (data.length / 3));
        if (numberChecker(indexer, idx)) {
          indexer.push(idx);
          break;
        }
      }
      newData.push(data[idx * 3]);
      newData.push(data[idx * 3 + 1]);
      newData.push(data[idx * 3 + 2]);

    }
    return (newData);
  }

  return {
    findHint,
    shuffler,
    solutionHandler,
    generateNextFlag,
    reshuffleData
  }
}

export default useUtils;