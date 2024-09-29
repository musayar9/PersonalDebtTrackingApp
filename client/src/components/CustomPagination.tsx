
import ReactPaginate from 'react-paginate';

const CustomPagination = ({pageCount, handlePageClick}:{pageCount:number, handlePageClick:(event: { selected: number }) => void}) => {
  return (
    <div className="flex items-center justify-end my-5 ">
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
          "flex items-center text-xs capitalize shadow-lg border  bg-base-100   join rounded-xl max-w-fit"
        }
        pageClassName={"p-2 border-l border-r border-base-100"}
        previousClassName={
          "w-20 text-center hover:bg-base-300 p-2 rounded-l-xl  font-semibold  hover:text-slate-50"
        }
        nextClassName={
          "w-20 text-center hover:bg-base-300  p-2 rounded-r-xl   font-semibold hover:text-slate-50"
        }
        activeClassName={"p-1 btn-active"}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default CustomPagination