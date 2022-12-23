import { useContext } from 'react';
import FlagContext from '../contexts/FlagContext';

const useFlag = () => useContext(FlagContext);

export default useFlag;