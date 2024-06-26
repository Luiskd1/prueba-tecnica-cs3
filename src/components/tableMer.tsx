import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useMerData } from '@/lib/fetch/query';
import Image from 'next/image';
import Link from 'next/link';
import { Result } from '@/lib/fetch/interface/interfaceApi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';
import { updateOffset } from '@/lib/store/slice/favoriteSlice';
import { Skeleton } from './ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ArrowUpDownIcon } from 'lucide-react';

export const MLANUM = 179571326;


const TableMer = () => {
  const [search, setSearch] = useState('');
  const dataOffset = useSelector((state: RootState) => state.favoritesLike.offset);
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<Result[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [sort, setSort] = useState('');
  const { merdata, refetch, isLoading } = useMerData(MLANUM, dataOffset, search, categoryId, sort);
  const DataTotalPages = merdata && merdata.paging ? Math.ceil(merdata.paging.total / 10) : 0;
  const paginationButtons = [
    { label: 'First', onClick: () => handlePageChange(1), disabled: page === 1, element:<ChevronLeftIcon/> },
    { label: 'Prev', onClick: () => handlePageChange(page - 1), disabled: page === 1, element:<ChevronLeftIcon/> },
    { label: 'Next', onClick: () => handlePageChange(page + 1), disabled: page === DataTotalPages, element:<ChevronRightIcon/> },
    { label: 'Last', onClick: () => handlePageChange(DataTotalPages), disabled: page === DataTotalPages , element:<ChevronRightIcon/>}
  ];
  const dataFind = useSelector((state: RootState) => state.favoritesLike.category);
  const handleSort = (dataSort:string)=>{
    setSort(dataSort);
  };
  
  useEffect(() => {
    setCategoryId(dataFind);
    setPage(1);
  }, [dataFind]);

  useEffect(() => {
    if (merdata && merdata.results.length === 0) {
      setPage(0);
    }
    if (merdata && merdata.results) {
      setData(merdata.results);
    }
    
  }, [merdata]);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    dispatch(updateOffset(0));
    setPage(1);
  };
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    dispatch(updateOffset((pageNumber - 1) * 10));
  };

  useEffect(() => {
    refetch();
  }, [page, search, refetch, categoryId, sort]);

  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex justify-between items-center gap-5 ">
        <h1 className="hidden lg:flex font-bold text-3xl w-2/3  ">Resultados</h1>
        <Input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className=""
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shrink-0">
              <ArrowUpDownIcon className="w-4 h-4 mr-2" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]" align="end">
            <DropdownMenuRadioGroup value={sort} onValueChange={(sort)=>handleSort(sort)}>
              <DropdownMenuRadioItem value="price_asc">Menor Precio</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price_desc">Mayor Precio</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="relevance">Relevante</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-auto border rounded-lg w-full">
        <Table className="w-full ">
          <TableHeader>
            <TableRow>
              <TableHead>Producto ID</TableHead>
              <TableHead>Nombre Producto</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Mercado Enlace</TableHead>
              <TableHead>Imagen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="w-24 h-5" /></TableCell>
                  <TableCell><Skeleton className="w-24 h-5" /></TableCell>
                  <TableCell><Skeleton className="w-24 h-5" /></TableCell>
                  <TableCell><Skeleton className="w-24 h-5" /></TableCell>
                  <TableCell><Skeleton className="w-16 h-16" /></TableCell>
                </TableRow>
              ))
              : data.map((item) => (
                <TableRow key={item.id} >
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="">{item.title}</TableCell>
                  <TableCell>$ {formatPrice(item.price)}</TableCell>
                  <TableCell><Link href={item.permalink} target="_blank" ><Button variant={'link'}>Visitar</Button></Link></TableCell>
                  <TableCell>
                    <Image src={item.thumbnail} alt={item.title} width={64} height={64} className="rounded-md" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing page {page} of {DataTotalPages} total of {merdata?.paging.primary_results} items
        </div>
        <div className="flex items-center gap-2">
          {paginationButtons.map((button, index) => (
            <Button key={index} variant="outline" disabled={button.disabled} onClick={button.onClick}>
              {button.element}
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const formatPrice = (price: any) => {
  const formattedPrice = Number(price).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formattedPrice;
};
function ChevronLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}


function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
export default TableMer;