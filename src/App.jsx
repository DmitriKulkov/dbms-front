import { useEffect, useState } from "react";
import "./App.module.css";
import styles from "./App.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TextField,
  IconButton,
  Tooltip as MuiTooltip,
} from "@mui/material";
import { Button, ButtonGroup } from "@mui/material";
import {addRow, deleteRow, getChart, getTable, updateRow} from "./api";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


import { tables } from "./Tables/Tables";


// fraemwork chartjs setup
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(tables.fac);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({});
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [chart, setChart] = useState([])

  const loadData = () => {
    setIsLoading(true);
    getTable(selected.name)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const loadChart = () => {
    getChart(selected.name)
        .then((res) => {
          setChart(res);
        })
        .catch((err) => console.log(err))
  }

  useEffect(() => {
    loadData();
    if(selected.name === 'faculty' || selected.name ==='exams' )loadChart();
  }, [selected]);


  const handleSelect = (table) => {
    setSelected(table);
  };

  const handleAddDialogOpen = () => {
    setIsAddOpen(true);
    setForm(
      Object.keys(selected.rows).reduce((acc, curr) => {
        if (curr !== "id") {
          acc[curr] = "";
        }
        return acc;
      }, {})
    );
  };

  const handleAddDialogClose = () => {
    setIsAddOpen(false);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateOpen(false);
  };

  const handleUpdateOpen = (row) => {
    setIsUpdateOpen(row.id);
    setForm(
      Object.keys(row).reduce((acc, curr) => {
        if (curr !== "id") {
          acc[curr] = row[curr];
        }
        return acc;
      }, {})
    );
  };
  const handleTextChange = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddRow = () => {
    addRow(selected.name, form)
      .then((res) => {
        handleAddDialogClose();
        loadData();
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleDelete = (id) => {
    deleteRow(selected.name, id)
      .then((res) => {
        loadData();
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleUpdateRow = (id) => {
    updateRow(selected.name, id, form)
      .then((res) => {
        handleUpdateDialogClose();
        loadData();
      })
      .catch((err) => console.log("err: ", err));
  };

  const settings = {
    backgroundColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ],
    borderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ],
    borderWidth: 1,
  };
  const getChartData = () => {
    switch (selected.name) {
      case "faculty": {
        return {
          labels: chart.map((stf)=>stf.name),
          datasets: [
            {
              label: "Number of students",
              data: chart.map((stf)=>stf.count),
              ...settings,
            },
          ],
        };
      }
      case "exams":
        return {
          labels: chart.map((ch)=>ch.name + " " +ch.surname + " " + ch.patronymic),
          datasets: [{
            label: ['Students\' points '],
            data: chart.map((ch)=>ch.sum),
                ...settings

          }]
        };
      default:
        return {};
    }
  };


const getSimpleReport = () =>{
  const keys = []
  const rows = []
  for (let k in selected.rows ){
    keys.push(k)
  }
  let row = []
  for (let k in data){
    for (let kk in data[k]){
      row.push(data[k][kk])
    }
    rows.push(row)
    row = []
  }

  const widths = []
  for (let n in keys){
    widths.push("*")
  }
  const body = [keys, ...rows]
  const simpleReportDef = {
    content: [
      {text:'Report ' + selected.name + ":", bold: true},
      ' ',
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: widths,
          body: body
        }
      }
    ]
  }
  pdfMake.createPdf(simpleReportDef).open();
}

const getComplexReport = () => {
  const keys = []
  const rows = []
  let row = []
  let kf = false
  for (let k in chart){
    for (let kk in chart[k]){
      if (!kf) {
        keys.push(kk)
      }
      row.push(chart[k][kk])
    }
    kf = true
    rows.push(row)
    row = []
  }

  const widths = []
  for (let n in keys){
    widths.push("*")
  }
  const body = [keys, ...rows]
  const simpleReportDef = {
    content: [
      {text:(selected.name === 'exams')?'Total students\' points: ':'Number of Students by Faculties', bold: true},
      ' ',
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: widths,
          body: body
        }
      }
    ]
  }
  pdfMake.createPdf(simpleReportDef).open();
}


  return (
    <div className={styles.app}>

      <header className={styles.header}>
        <ButtonGroup>
          <Button
            variant={
              tables.fac.name === selected.name ? "contained" : "outlined"
            }
            onClick={() => handleSelect(tables.fac)}
          >
            {tables.fac.name}
          </Button>
          <Button
            variant={
              tables.exams.name === selected.name ? "contained" : "outlined"
            }
            onClick={() => handleSelect(tables.exams)}
          >
            {tables.exams.name}
          </Button>
          <Button
            variant={
              tables.stud.name === selected.name
                ? "contained"
                : "outlined"
            }
            onClick={() => handleSelect(tables.stud)}
          >
            {tables.stud.name}
          </Button>
        </ButtonGroup>
      </header>
      <ButtonGroup>
        <Button onClick={getSimpleReport}>Get Simple Report</Button>
        {
          (selected.name === "exams")?
              <Button onClick={getComplexReport}>Get Group Report</Button>
              : null
        }
        {
          (selected.name === "faculty")?
              <Button onClick={getComplexReport}>Get MultiTable Report</Button>
              : null
        }
      </ButtonGroup>
      <Button onClick={handleAddDialogOpen}>Add</Button>


      <div className={styles.container}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(selected.rows).map((name) => (
                <TableCell variant="head" key={name}>
                  {name}
                </TableCell>
              ))}
              <TableCell className={styles.iconCell} size="small">
                Edit
              </TableCell>
              <TableCell className={styles.iconCell} size="small">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {Object.keys(selected.rows).map((name) => (
                  <TableCell key={name} variant="body">
                    {row[name]}
                  </TableCell>
                ))}
                <TableCell className={styles.iconCell} size="small">
                  <MuiTooltip title="edit">
                    <IconButton onClick={() => handleUpdateOpen(row)}>
                      <Edit className={styles.icon} />
                    </IconButton>
                  </MuiTooltip>
                </TableCell>
                <TableCell className={styles.iconCell} size="small">
                  <MuiTooltip title="delete">
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <Delete className={styles.icon} />
                    </IconButton>
                  </MuiTooltip>
                </TableCell>
                <Dialog open={isUpdateOpen === row.id}>
                  <DialogContent>
                    {Object.keys(form).map((name) => {
                      return (
                        <TextField
                          key={name}
                          name={name}
                          value={form[name]}
                          placeholder={name}
                          onChange={handleTextChange}
                        />
                      );
                    })}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => handleUpdateDialogClose()}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleUpdateRow(row.id)}>OK</Button>
                  </DialogActions>
                </Dialog>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {
        selected === tables.fac ? (
          <div className={styles.chartContainer}>
            <Pie data={getChartData()} className={styles.chart} />
          </div>
        ) : selected === tables.exams ?(
            <div>
              <Bar data={getChartData()} className={styles.chart}/>
            </div>
        ):null}
      </div>
      <Dialog open={isAddOpen}>
        <DialogContent>
          {Object.keys(form).map((r) => (
            <TextField
              key={r}
              name={r}
              value={form[r]}
              placeholder={r}
              onChange={handleTextChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleAddRow}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
