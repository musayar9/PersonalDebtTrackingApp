
import ReactPaginate from 'react-paginate';

const CustomPagination = ({pageCount, handlePageClick}:{pageCount:number, handlePageClick:(event: { selected: number }) => void}) => {
  return (
    <div className="flex items-center justify-end my-5">
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={
          "flex items-center text-xs  capitalize bg-slate-50 border border-slate-300 rounded-xl max-w-fit"
        }
        pageClassName={"p-2 border-l border-r border-slate-50"}
        previousClassName={
          "w-20 text-center hover:bg-slate-400  hover:p-2 hover:rounded-l-lg text-gray-700 font-semibold  hover:text-slate-50"
        }
        nextClassName={
          "w-20 text-center hover:bg-slate-400 hover:p-2 hover:rounded-r-lg text-gray-700 font-semibold hover:text-slate-50"
        }
        activeClassName={"text-slate-50 p-1 bg-slate-400"}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default CustomPagination