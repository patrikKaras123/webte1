import { FC, useEffect, useRef, useState } from 'react'
import { columns } from '../types/Column'
import { Photo } from '../types/Photo'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import useFlag from '../hooks/useFlags'
import useSetter from '../hooks/useSetter'
import CustomButton from '../utils/CustomButton'
import DropAndDrag from '../utils/DropAndDrag'
import Popover from '../utils/Popover'
import useUtils from '../hooks/useUtils'
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint'
import TextField from '@mui/material/TextField';


const columnsData: columns[] = [
  {
    id: '1',
    name: 'To use',
    items: [],
  },
  {
    id: '2',
    name: 'Flag',
    items: [],
  },
]

interface DragDropProps {
  difficulty: number
  setPlay: () => void
}

const DragDrop: FC<DragDropProps> = (props) => {
  const { easy, medium, hard, questionSelected, levelHandler, updateHandler } = useFlag()
  const { difficulty, setPlay } = props
  const [columns, setColumns] = useState<columns[]>(columnsData);
  const [data, setData] = useState<Photo[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [hint, setHint] = useState<string>("Move everything to Flag section");
  const [name, setName] = useState<string>("");
  const [next, setNext] = useState<{ next: boolean, name: boolean }>({
    next: false,
    name: false
  });
  const [solution, setSolution] = useState<string>("Nothing");
  const { setQuestions, setEasy, setMedium, setHard } = useSetter();
  const { findHint, shuffler, solutionHandler, generateNextFlag, reshuffleData } = useUtils();
  let componentRef = useRef(null);

  const setColumnsItems = () => {
    let question: number[] = questionSelected
    question[difficulty - 1] += 3;
    setQuestions(question)

    if (question[difficulty - 1] >= data.length) {
      question[difficulty - 1] = 0;
      const newShuffledData = reshuffleData(data);
      updateHandler({ data: newShuffledData, level: difficulty });
      setShuffled(newShuffledData, question);
      setOpen(true);
    }
    levelHandler(question)
    return (generateNextFlag(columns, question[difficulty - 1], data));
  }

  const setShuffled = (newShuffledData: Photo[], questions: number[]) => {
    switch (difficulty) {
      case 1:
        setEasy(newShuffledData, questions);
        break;
      case 2:
        setMedium(newShuffledData, questions);
        break;
      case 3:
        setHard(newShuffledData, questions);
        break;
    }
  }

  const onDragEnd = (result: any, columns: any) => {
    try {
      if (!result.destination) {
        return
      }
      const { source, destination } = result

      let updatedColumns = columns.map((column: Photo) => {
        return column
      })

      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[Number(source.droppableId) - 1]
        const destColumn = columns[Number(destination.droppableId) - 1]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)

        updatedColumns[Number(source.droppableId) - 1] = {
          ...sourceColumn,
          items: sourceItems,
        }
        updatedColumns[Number(destination.droppableId) - 1] = {
          ...destColumn,
          items: destItems,
        }
      } else {
        const column = columns[Number(source.droppableId) - 1]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)

        updatedColumns[Number(source.droppableId) - 1] = {
          ...column,
          items: copiedItems,
        }
      }

      if (nextFlag(updatedColumns)) {
        updatedColumns = setColumnsItems()
      }
      setColumns(updatedColumns)
    } catch (e) {
      //pass
    }
  }

  const flagNameHandler = (e: any) => {
    setName(e.target.value);
    const equalNames = (columns[0].items.length > 0 ? e.target.value === columns[0].items[0].tag : false)
      || (columns[1].items.length > 0 ? e.target.value === columns[1].items[0].tag : false);
    if (!next?.next && equalNames) {
      setNext({ ...next, name: true });
    }
    if (next?.next && equalNames) {
      setName("");
      setHint(`Move everything to Flag section`);
      setSolution("");
      const updatedColumns = setColumnsItems();
      setColumns(updatedColumns)
      setNext({ name: false, next: false });
    }
  }

  const nextFlag = (updatedColumns: columns[]) => {
    if (
      updatedColumns[0].items.length === 0 &&
      updatedColumns[1].items.length === 3
    ) {
      for (let i = 0; i < 2; i++) {
        if (updatedColumns[1].items[i].id > updatedColumns[1].items[i + 1].id) {
          setNext({ ...next, next: false });
          setSolution(solutionHandler(updatedColumns[1]));
          setHint("Not Correct order");
          return false
        }
      }
      setSolution("Flags are in correct order and now guess flag name");
      setNext({ ...next, next: true });
      if (next?.name) {
        setHint(`Move everything to Flag section`);
        setName("");
        setNext({ name: false, next: false });
        return true;
      } else {
        setHint(`Flag name is ${updatedColumns[1].items[0].tag}`);
        return false;
      }
    } else {
      setNext({ ...next, next: false });
      setHint(findHint(updatedColumns));
    }
    return false
  }

  const resetHandler = () => {
    const shuffleData = shuffler();
    const prevColumns = columns.map((prev: columns) => {
      prev.items = []
      return prev
    })

    for (
      let i = questionSelected[difficulty - 1];
      i < questionSelected[difficulty - 1] + 3;
      i++
    ) {
      prevColumns[0].items.push(data[i + shuffleData[0]])
      shuffleData.shift()
    }
    setColumns(prevColumns)
  }

  useEffect(() => {
    let _data: Photo[] = []
    let _question: number = 0

    switch (difficulty) {
      case 1:
        _data = easy
        _question = questionSelected[0]
        setData(easy)
        break
      case 2:
        _data = medium
        _question = questionSelected[1]
        setData(medium)
        break
      case 3:
        _data = hard
        _question = questionSelected[2]
        setData(hard)
        break
    }
    const prevColumns = generateNextFlag(columns, _question, _data);
    setColumns(prevColumns)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty])

  const handleMotionEvent = (event: any) => {
    const x = event.alpha;
    const y = event.beta;
    const z = event.gamma;
    const acceleration = Math.sqrt(x * x + y * y + z * z);
    //console.log(acceleration);
    // Adjust sensibility, because it can depend of usage (& devices)
    const sensibility = 350;
    if (acceleration >= sensibility) {
      resetHandler();
    };
  }
  window.addEventListener('deviceorientation', handleMotionEvent, true);
  window.addEventListener('devicemotion', handleMotionEvent, true);

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 2,
            pb: 0,
          }}
        >
          <ReactToPrint
            trigger={() =>
              <Button
                variant="contained"
                style={{
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  margin: 5
                }}>
                Print this out!
              </Button>}
            content={() => componentRef.current
            }
          />
          <ComponentToPrint ref={componentRef} />
          <Grid
            container
            spacing={2}
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: 7,
            }}
          >
            <CustomButton
              clickEvent={resetHandler}
              name="Reset"
            />
            <CustomButton
              clickEvent={setPlay}
              name="Change level"
            />
            <Grid
              style={{
                margin: 5,
                marginRight: 0
              }}
            >
              <Popover text={hint} nameButton="Hint" />
            </Grid>
            <Grid
              style={{
                margin: 5
              }}
            >
              {columns[1].items.length === 3 && <Popover text={solution} nameButton="Solution" />}
            </Grid>
          </Grid>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          <Grid
            container
            spacing={2}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: "wrap",
              width: "100%"
            }}
          >
            <Grid item sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              <DropAndDrag next={next.next} columns={columns} onDragEnd={onDragEnd} />
            </Grid>
          </Grid>
        </Container>
        <Grid style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            label="Flag name"
            id="filled-error"
            variant="filled"
            value={name}
            onChange={flagNameHandler}
            inputProps={{ style: { color: "white", backgroundColor: "gray", borderRadius: 5, marginBottom: 5 } }}
          />
        </Grid>
      </main>
      <div>
        <Dialog
          open={open}
          onClose={() => setPlay()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'You solved everything'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Click on the button to change level and select difficulty
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPlay()} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default DragDrop;
