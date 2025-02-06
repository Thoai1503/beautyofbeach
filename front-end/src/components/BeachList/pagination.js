// Hàm lọc để tạo chức năng phân trang
// Hàm paginate nhận đối số đầu vào là mảng các đối tượng beach
const paginate = (beaches) => {
  const itemsPerPage = 9; //Chỉ định số lượng Card có trong 1 trang
  const numberOfPages = Math.ceil(beaches.length / itemsPerPage); // Công thức tính: Số trang= độ dài số lượng Card chia cho số Card trong 1 trang

  const newBeaches = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return beaches.slice(start, start + itemsPerPage);
  }); //Hàm tạo mảng mới với mỗi phần tử là 1 đối tượng trang (trong mỗi trang là mảng con chứa phần tử Card)

  return newBeaches;
};

export default paginate;
