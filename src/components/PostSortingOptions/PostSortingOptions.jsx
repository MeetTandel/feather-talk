import { useEffect, useState } from "react";
import { FaSortAmountDown as SortIcon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSortMethod, setUserFeed } from "../../store/DataSlice";

export function PostSortingOptions() {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const selectedMethod = e.target?.dataset?.sort;

    if (selectedMethod) {
      dispatch(setSortMethod(selectedMethod));
      setShowSortOptions(false);
    }
  };

  useEffect(() => {
    if (data.filteredPosts.length > 0) {
      setUserFeed(data, dispatch);
    }
  }, [data.filteredPosts]);

  return (
    <div className="relative self-end flex flex-col gap-2">
      <div
        onClick={() => setShowSortOptions(!showSortOptions)}
        className="self-end mr-4 bg-white dark:bg-gray-600 hover:bg-blue-50 dark:hover:bg-gray-500 p-2 rounded-lg shadow-lg cursor-pointer"
      >
        <SortIcon size={24} />
      </div>

      {showSortOptions && (
        <div
          onClick={handleClick}
          className="absolute -bottom-[6rem] right-0 z-10 mr-4 w-max bg-white dark:bg-gray-600 rounded-lg shadow-lg dark:shadow-gray-700 overflow-hidden text-right"
        >
          <h3
            data-sort="latest"
            className="p-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-700"
          >
            Latest First
          </h3>
          <hr></hr>
          <h3
            data-sort="trending"
            className="p-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-700"
          >
            Trending First
          </h3>
        </div>
      )}
    </div>
  );
}
