import { useReducer } from "react";
import { createContext } from "react";
import { FC } from "react";
import { ReactNode } from "react";
import { useEffect } from "react";
import { Photo } from "../types/Photo";
import STATE from "../states.json";
import PHOTOS from "../photos.json";
import AppService from "../services/AppService";


interface State {
  level: number;
  questionSelected: number[];
  easy: Photo[];
  medium: Photo[];
  hard: Photo[];
}

interface FlagContextValue extends State {
  levelHandler: (level: number[]) => void;
  updateHandler: (data: any) => void;
}

interface FlagProviderProps {
  children?: ReactNode;
}

const initialState: State = {
  level: 1,
  questionSelected: [0,0,0],
  easy: [],
  medium: [],
  hard: [],
};

const handlers: Record<string, (state: State, action: any) => State> = {
  LEVEL: (state: State, action: any): any => {
    const { level } = action.payload;

    return {
      ...state,
      level
    }
  },

  SET: (state: State, action: any): any => {
    const { data } = action.payload;
    const parsedData = JSON.parse(data);
    
    return {
      ...state,
      level: parsedData.level,
      questionSelected: parsedData.questionSelected,
      easy: parsedData.easy,
      medium: parsedData.medium,
      hard: parsedData.hard,
      setter: true
    }
  },

  UPDATE: (state: State, action: any): any => {
    const { data } = action.payload;
    //console.log(data);

    if(data.level === 1){
      return {
        ...state,
        easy: data.data,
      }
    }
    if(data.level === 2){
      return {
        ...state,
        medium: data.data,
      }
    }
    if(data.level === 3){
      return {
        ...state,
        hard: data.data,
      }
    }
  },

  GET: (state: State, action: any): any => {
    const _dataPhotosEasy: Photo[] = [];
    const _dataPhotosMedium: Photo[] = [];
    const _dataPhotosHard: Photo[] = [];
    STATE.forEach((state) => {
      if(state.difficulty === 1) {
        PHOTOS.forEach((photo: Photo) => {
          if(photo.tag === state.tag) {
            _dataPhotosEasy.push(photo);
          }
        })
      }
      if(state.difficulty === 2) {
        PHOTOS.forEach((photo: Photo) => {
          if(photo.tag === state.tag) {
            _dataPhotosMedium.push(photo);
          }
        })
      }
      if(state.difficulty === 3) {
        PHOTOS.forEach((photo: Photo) => {
          if(photo.tag === state.tag) {
            _dataPhotosHard.push(photo);
          }
        })
      }
    })
    
    return {
      ...state,
      level: 1,
      questionSelected: [0,0,0],
      easy: _dataPhotosEasy,
      medium: _dataPhotosMedium,
      hard: _dataPhotosHard,
      setter: true
    }
  },
};

const reducer = (state: State, action: any): State => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

const FlagContext = createContext<FlagContextValue>({
  ...initialState,
  levelHandler: () => {},
  updateHandler: () => {}
});

export const FlagProvider: FC<FlagProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const questionHandler = () => {
      const data = AppService.getData();
      if(!data) {
        dispatch({
          type: "GET"
        })
      } else {
        dispatch({
          type: "SET",
          payload: {
            data: data
          }
        });
      }
    }
    questionHandler();
  }, [])


  const levelHandler = async (level: number[]) => {

    dispatch({
      type: 'LEVEL',
      payload: {
        level: level
      }
    });
  };

  const updateHandler = async (data: {data: Photo[], level: number}) => {

    dispatch({
      type: 'UPDATE',
      payload: {
        data: data
      }
    });
  };

  return (
    <FlagContext.Provider
      value={{
        ...state,
        levelHandler,
        updateHandler
      }}
    >
      {children}
    </FlagContext.Provider>
  );
};
export default FlagContext;
