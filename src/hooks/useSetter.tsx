import useFlag from "./useFlags";
import AppService from "../services/AppService";
import { Photo } from "../types/Photo";

const useSetter = () => {
  const { easy, medium, hard, questionSelected, level } = useFlag();

  const setLevel = (level: number) => {
    AppService.setData(`{
      "level": ${JSON.stringify(level)},
      "questionSelected": ${JSON.stringify(questionSelected)},
      "easy": ${JSON.stringify(easy)},
      "medium": ${JSON.stringify(medium)},
      "hard": ${JSON.stringify(hard)}
    }`)
  }

  const setQuestions = (levels: number[]) => {
    AppService.setData(`{
      "level": ${JSON.stringify(level)},
      "questionSelected": ${JSON.stringify(levels)},
      "easy": ${JSON.stringify(easy)},
      "medium": ${JSON.stringify(medium)},
      "hard": ${JSON.stringify(hard)}
    }`)
  }

  const setEasy = (_easy: Photo[], _questions: number[]) => {
    AppService.setData(`{
      "level": ${JSON.stringify(level)},
      "questionSelected": ${JSON.stringify(_questions)},
      "easy": ${JSON.stringify(_easy)},
      "medium": ${JSON.stringify(medium)},
      "hard": ${JSON.stringify(hard)}
    }`)
  }

  const setMedium = (_medium: Photo[], _questions: number[]) => {
    AppService.setData(`{
      "level": ${JSON.stringify(level)},
      "questionSelected": ${JSON.stringify(_questions)},
      "easy": ${JSON.stringify(easy)},
      "medium": ${JSON.stringify(_medium)},
      "hard": ${JSON.stringify(hard)}
    }`)
  }

  const setHard = (_hard: Photo[], _questions: number[]) => {
    AppService.setData(`{
      "level": ${JSON.stringify(level)},
      "questionSelected": ${JSON.stringify(_questions)},
      "easy": ${JSON.stringify(easy)},
      "medium": ${JSON.stringify(medium)},
      "hard": ${JSON.stringify(_hard)}
    }`)
  }

  return {
    setLevel,
    setQuestions,
    setEasy,
    setMedium,
    setHard,
  };
}

export default useSetter;