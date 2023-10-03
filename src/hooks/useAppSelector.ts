import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "../redux/store";

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector; //annotating type to make a hook with preannotated type
export default useAppSelector;