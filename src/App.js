import { useState, useRef } from 'react';
import './App.css';
import { toDo } from "./components/ToDoList"
import SortIcon from '@mui/icons-material/Sort';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReactPaginate from 'react-paginate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function App() {
  const scollToTable = useRef();
  const scollToInput = useRef();
  const down = useRef();
  const [count, setCount] = useState(11);
  const [list, setList] = useState(toDo);
  const [search, setSearch] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [sex, setSex] = useState('');
  const [tuTuoi, setTuTuoi] = useState('');
  const [denTuoi, setDenTuoi] = useState('');
  const [n1, setTuNgay] = useState('');
  const [n2, setDenNgay] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [clickCountName, setClickCountName] = useState(0);
  const [clickCountDate, setClickCountDate] = useState(0);
  const [clickCountS, setClickCountS] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(list.length / PER_PAGE);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  const calculateIndex = (index) => {
    return currentPage * PER_PAGE + index + 1;
  };
  const clickName = () => {
    setClickCountName(c => c + 1);
    if (clickCountName === 0) {
      sortByNameTang()
    } else if (clickCountName === 1) {
      sortByNameGiam()
    } else {
      setList(toDo);
    }
  }
  const clickDate = () => {
    setClickCountDate(c => c + 1);
    if (clickCountDate === 0) {
      sortByDateTang()
    } else if (clickCountDate === 1) {
      sortByDateGiam()
    } else {
      setList(toDo);
    }
  }
  const clickS = () => {
    setClickCountS(c => c + 1);
    if (clickCountS === 0) {
      sortByST()
    } else if (clickCountS === 1) {
      sortBySG()
    } else {
      setList(toDo);
    }
  }
  const clickAge = () => {
    setClickCount(prevCount => prevCount + 1);
    if (clickCount === 0) {
      // Gọi hàm cho lần nhấp đầu tiên
      sortByAgeTang();
    } else if (clickCount === 1) {
      // Gọi hàm cho lần nhấp thứ hai
      sortByAgeGiam();
    } else {
      setList(toDo);
    }
  };

  const x = () => {
    down.current.scrollIntoView();
  }
  console.log(name);
  const generateId = () => {
    setCount(count + 1);
  }
  const add = () => {
    generateId();
    // alert("click")
    // const to = [...toDo];
    const newData = {
      id: count,
      name: name,
      age: age,
      date: date,
      sex: sex,
    }
    if (/[^a-z A-Z]+$/.test(name)) {
      alert("Tên phải là chữ");
    } else if (name === '') {
      alert("Tên không được để trống");
    } else if (!/^\d+$/.test(age)) {
      alert("Tuổi là 1 số nguyên dương")
    } else if (age === '') {
      alert("Không được để trống tuổi");
    } else if (date === '') {
      alert("Không được để trống ngày sinh");
    } else {
      alert("Add thành công")
      console.log(count);
      list.push(newData);
      reset();
      scollToTable.current.scrollIntoView();
    }
  }
  const deleteById = (id) => {
    const newData = list.filter(i => i.id !== id);
    // this.setState({ toDo: newData })
    setList(newData)
    // toDo = newData;
  }
  const reset = () => {
    setId('');
    setName('');
    setAge('');
    setDate('');
    setSex('');
    setDenNgay('');
    setTuNgay('');
    setDenTuoi('');
    setTuTuoi('');
  }
  const edit = (to) => {
    // const newData = list.filter(i => i.id === id);
    // setList(newData);
    setId(to.id)
    setName(to.name)
    setAge(to.age)
    setDate(to.date)
    setSex(to.sex)
    scollToInput.current.scrollIntoView();
  }

  const sortByAgeTang = () => {

    const newData = [...list].sort(function (t1, t2) {
      return t1.age - t2.age;
    });
    setList(newData);

  }
  const sortByAgeGiam = () => {

    const newData = [...list].sort(function (t1, t2) {
      return t2.age - t1.age;
    });
    setList(newData);

  }


  const sortByDateTang = () => {
    const newData = [...list].sort(
      (a, b) => (new Date(b.date) - new Date(a.date))
    );
    setList(newData);
    console.table(list);
  }
  const sortByDateGiam = () => {
    const newData = [...list].sort(
      (a, b) => (new Date(a.date) - new Date(b.date))
    );
    setList(newData);
    console.table(list);
  }


  const sortByNameTang = () => {
    const newData = [...list].sort(function (name1, name2) {
      return name2.name.length - name1.name.length;

    })
    reset();
    setList(newData);
    console.table(list);
  }
  const sortByNameGiam = () => {
    const newData = [...list].sort(function (name1, name2) {
      return name1.name.length - name2.name.length;

    })
    reset();
    setList(newData);
    console.table(list);
  }


  const sortByST = () => {
    const newData = [...list].sort(function (s1, s2) {
      return s1.sex.length - s2.sex.length;

    })
    setList(newData);
    reset()
  }
  const sortBySG = () => {
    const newData = [...list].sort(function (s1, s2) {
      return s2.sex.length - s1.sex.length;

    })
    setList(newData);
    reset()
  }


  const khoangTuoi = () => {
    console.log(tuTuoi, denTuoi)
    if (tuTuoi === '') {
      alert("Ô input từ tuổi trống");
    } else if (denTuoi === '') {
      alert("Ô input đến tuổi trống");
    } else {
      const r = list.filter(item => item.age >= tuTuoi && item.age <= denTuoi);
      setList(r);
      reset();
    }
  }
  const khoangNgay = () => {
    console.log(n1, n2)
    if (n1 === '') {
      alert("Ô input từ ngày trống");
    } else if (n2 === '') {
      alert("Ô input đến ngày trống");
    } else {
      const n = list.filter(item => item.date >= n2 && item.date <= n1)
      reset();
      setList(n);
    }
  }
  const update = (id, to) => {
    const newData = {
      id: id,
      name: name,
      age: age,
      date: date,
      sex: sex,
    }
    if (/[^a-z A-Z]+$/.test(name)) {
      alert("Tên phải là chữ");
    } else if (name === '') {
      alert("Tên không được để trống");

    } else if (!/^\d+$/.test(age)) {
      alert("Tuổi là 1 số nguyên dương ")
    } else if (age === '') {
      alert("Không được để trống tuổi");
    } else if (date === '') {
      alert("Không được để trống ngày sinh");
    } else {
      list.splice(list.findIndex((t) => t.id === id), 1, newData)
      reset()
    }
  }

  return (
    <div className="App" style={{ backgroundImage: "url(https://phunugioi.com/wp-content/uploads/2020/02/mau-background-dep.jpg)" }}>
      <div className="container-fluid" ref={scollToInput}>
        {/* <main> */}
        <div className="mb-3">
          <label>ID: </label>
          <input type="" className="form-control" id="txtId" name="id" placeholder="identity" disabled value={id} />
        </div>
        <div className="mb-3">
          <label>Họ và tên:</label>
          <input type="name" className="form-control" id="txtName" placeholder="Enter Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Tuổi:</label>
          <input type="age" className="form-control" id="txtAge" placeholder="Enter Age" name="age" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Ngày sinh:</label>
          <input type="date" className="form-control" id="txtDate" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Giới tính:</label>
          <input type="radio" name="gioiTinh" value="Nam" checked onClick={(e) => setSex(e.target.value)} /><label>Nam</label>
          <input type="radio" name="gioiTinh" value="Nữ" checked={sex === 'Nữ'} onClick={(e) => setSex(e.target.value)} /><label>Nữ</label>
        </div>
        {/* <Link to="/add">Add</Link> */}
        <button style={{ margin: "10px" }} onClick={add} className='btn btn-success'>add</button>
        <button className='btn btn-warning' onClick={reset}>Clear</button>

        <div className="mb-3">
          <label style={{ marginRight: "50px" }}>Khoảng tuổi: </label>
          <input style={{ marginRight: "10px", width: "140px" }} value={tuTuoi} type="number" placeholder="Từ tuổi" min="0" max="100" onChange={(e) => setTuTuoi(e.target.value)} />
          <input style={{ margin: "10px", width: "140px" }} value={denTuoi} type="number" placeholder="Đến tuổi" min="0" max="100" onChange={(e) => setDenTuoi(e.target.value)} />
          <FilterAltIcon style={{ color: "aqua" }} onClick={() => khoangTuoi()} />
        </div>
        <div className="mb-3">
          <label htmlFor="">Khoảng ngày sinh: </label>
          <input style={{ margin: "10px" }} type="date" value={n1} onChange={(e) => setTuNgay(e.target.value)} />
          <input style={{ margin: "10px" }} type="date" value={n2} onChange={(e) => setDenNgay(e.target.value)} />
          <FilterAltIcon style={{ color: "aqua" }} onClick={() => khoangNgay()} />
        </div>
        <div id='down' >
          <ExpandMoreIcon onClick={() => x()} />
        </div>
        <div className="float-end d-flex mb-3">
          <input style={{ width: "300px" }} className="form-control me-2" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn-primary" type="button">Search</button>
        </div>

        <table className="table table-hover" style={{ textAlign: "center" }}>
          <thead className='table-danger'>
            <tr>
              <th><a id='load' href='http://localhost:3000/'>STT</a></th>
              <th>Tên <SortByAlphaIcon onClick={() => clickName()} /></th>
              <th>Tuổi <FilterListIcon onClick={() => clickAge()} /></th>
              <th>Ngày sinh <FilterListIcon onClick={() => clickDate()} /></th>
              <th>Giới tính <SortIcon onClick={() => clickS()} /></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody ref={scollToTable}>
            {
              list.slice(offset, offset + PER_PAGE).filter((item) => {
                return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
              }).map(
                (toDo, index) => (
                  <tr key={toDo.id}>
                    <td>{calculateIndex(index)}</td>
                    <td>{toDo.name}</td>
                    <td>{toDo.age}</td>
                    <td>{toDo.date}</td>
                    <td>{toDo.sex}</td>
                    <td>
                      <button className='btn btn-danger' style={{ margin: "10px" }} onClick={() => deleteById(toDo.id)}>Delete</button>
                      <button className='btn btn-info' style={{ margin: "10px" }} onClick={() => edit(toDo)}>Edit</button>
                      <button className='btn btn-success' onClick={() => update(id, toDo)}>Update</button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
        <div ref={down}>
          <ReactPaginate
            previousLabel={'<<'}
            nextLabel={'>>'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            previousLinkClassName={'prev'}
            nextLinkClassName={'next'}
            pageLinkClassName={'page'}
          />
        </div>
        {/* </main> */}
      </div>
    </div>
  );
}

export default App;
