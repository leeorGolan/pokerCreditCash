import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { Typography, Box, Stack ,IconButton } from "@mui/material";
import TotalModal from "./TotalModal";
import NavBar from "./NavBar";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import { teal, deepOrange,green,blueGrey,red} from "@mui/material/colors";
import Popover from '@mui/material/Popover';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
uuidv4();

function TodoWrapper() {
  const [todos, setTodos] = useState(JSON.parse(window.localStorage.getItem("MY_TODOS") ?? '[]'));

  const [totalNum, setTotalNum] = useState(0);
  const [zerolNum, setZeroNum] = useState(0);
  const [totalPlusNumbers, setTotalPlusNumbers] = useState(0);
  const [totalCashNumbers, setTotalCashNumbers] = useState(0);
  const [totalMinusNumbers, setTotalMinusNumbers] = useState(0);
  const [lockState,setLockState] = useState(true)
  // const [lockOpc,setLockOpc] =useState(1)

  useEffect(() => {
    localStorage.setItem("MY_TODOS", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo,todoCash) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
         idCash: uuidv4(),
        task: todo,
        taskCash:todoCash,
        // cashTask:todo,
        completed: false,
        isEditing: false,
        num: 0,
        numCash: 0,

        // zeroNum:0
      },
    ]);
    console.log(todos);
  };

  const plus = (id) => {
    todos.forEach((t) => {
      if (t.id === id) {
        t.num = t.num + 1;
      }
    });

    setTodos([...todos]);
  };

  const plusCash = (idCash) => {
    todos.forEach((c) => {
      if (c.idCash === idCash) {
        c.numCash = c.numCash + 1;
      }
    });

    setTodos([...todos]);
  };

  const minus = (id) => {
    todos.forEach((t) => {
      if (t.id === id) {
        t.num = t.num - 1;
      }
    });
    setTodos([...todos]);
  };

  const minusCash = (idCash) => {
    todos.forEach((t) => {
      if (t.idCash === idCash) {
        t.numCash = t.numCash - 1;
      }
    });
    setTodos([...todos]);
  };

  let totalPlusNumbersCounter = 0;
  let totalMinusNumbersCounter = 0;
  let totalCashNumbersCounter = 0;
  let sum = 0;
  let zero = 0



   const zeroNumbers = () => {
  // todos.forEach(t => {
  todos.forEach( (n)=> {zero += n.num})
  setZeroNum(zero)
  // console.log(zero);
  }
  

  
  //setTodos([...todos])



  const allNumbers = () => {
    todos.forEach((t) => {
      sum += Math.abs(t.num);
    });
    setTotalNum(sum);
    // console.log(sum);
  };


  
  const totalPlusNumbersFunction = () => {
    todos.forEach((t) => {
      if (t.num > 0){
        totalPlusNumbersCounter += (t.num);
    }
    });
    setTotalPlusNumbers(totalPlusNumbersCounter);
     console.log(totalPlusNumbersCounter);
  };


  
  const totalCashNumbersFunction = () => {
    todos.forEach((t) => {
      if (t.numCash > 0){
        totalCashNumbersCounter += (t.numCash);
    }
    });
    setTotalCashNumbers(totalCashNumbersCounter);
     console.log(totalCashNumbersCounter);
  };




  const totalMinusNumbersFunction = () => {
    todos.forEach((t) => {
      if (t.num < 0){
        totalMinusNumbersCounter += (t.num);
    }
    });
    setTotalMinusNumbers(totalMinusNumbersCounter);
     console.log(totalMinusNumbersCounter);
  };

  
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  // const editTodo =id =>{
  //   setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing:!todo.isEditing } : todo  ))
  // }

const clearList  = () =>{
  setTodos([])
}


function sorti(a, b) {

    let sortedNumba ;
    sortedNumba = todos.sort(function(a, b){return b.num- a.num})
    // console.log(sortedNumba)

    
}

function lockFn (){
  setLockState((prev) => !prev)
  // setLockOpc((prev) => !prev)
  console.log(lockState)
}

  return (
    <Box sx={{ display: 'flex' }}>
       <CssBaseline />
      <NavBar clearList={clearList}  position='fixed'/>
      
      
      
      
      {/* <Box sx={{backgroundColor:'pink',minHeight:'100%',height:'100vh',width:'100vw'}}>
      <Typography>vbcvb</Typography>
      </Box> */}
      <Box
       sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:'#45C4B0',
        height: "90vh",
        width: "100%",
        minWidth: "100%",
        mt: 5,
      }}

  
      >
        <Stack
          width={"100%"}
          direction="column"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            
          }}
        >
         
          <ToDoList addTodo={addTodo} />
          <Box sx={{display:'flex' ,flexDirection:'row' ,justifyContent: "space-between",
                alignItems: "center",width:'100%'}}>
          <Box sx={{ display:'flex' ,flexDirection:'row',ml:12,width:160,backgroundColor:'',justifyContent: "space-between"}}>
            <Typography variant='h5'>Credit</Typography>
            <Typography variant='h5'>Cash</Typography>
            </Box>
            <IconButton onClick={lockFn} sx={{mr:2}}>
              {lockState === true ? <LockOpenOutlinedIcon fontSize="large" sx={{backgroundColor:'green'}} /> : <LockOutlinedIcon fontSize="large" sx={{backgroundColor:'red'}}/>}
            </IconButton>
          </Box>

          {todos.map((todo,cashTodo,index) => (
            <Todo
           
            lock={lockState}
               taskCash={todo} 
              task={todo}
              key={todo.id}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              // editTodo={editTodo}
              plus={plus}
              minus={minus}
              minusCash={minusCash}
              plusCash={plusCash}
            />
          ))}
        </Stack>

        <TotalModal
          player={todos.map((todo, index) => (
            <Typography variant='h5' sx={{ color:'#012030'}}  key={index}>{todo.task}</Typography>
          ))}
          numba={todos.map((todo, index) => (
            <Typography  variant='h5'  color= {todo.num < 0 ? red[800]:'green'} key={index}>{todo.num}</Typography>
          ))}
          cashNumba={todos.map((todo, index) => (
            <Typography  variant='h5'  color= {'green'} key={index}>{todo.numCash}</Typography>
          ))}
          allNumbers={allNumbers}
          zeroNumbers={zeroNumbers}
          totalos={totalNum}
          totalZero= {zerolNum}
          sorti={sorti}
          totalPlusNumbersFunction={totalPlusNumbersFunction}
          totalMinusNumbersFunction={totalMinusNumbersFunction}
          totalCashNumbersFunction={totalCashNumbersFunction}
          totalPlusNumbers={totalPlusNumbers}
          totalMinusNumbers={totalMinusNumbers}
          totalCashNumbers={totalCashNumbers}

        />

      </Box>
    </Box>
  );
}

export default TodoWrapper;
