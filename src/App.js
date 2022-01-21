import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./App.css";
import { useForm } from "react-hook-form";
import Papa from "papaparse";
import { ValidationText } from "./components/validationText/validationText";
import { formatData } from "./utilityFxn";

const agendaSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
  date: yup.string().required("Date is required"),
});

function App() {
  const [agenda, setAgenda] = useState([]);
  const today = new Date().toLocaleDateString();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agendaSchema),
  });
  const onSubmit = (data) => {
    let payload = [...agenda];
    const dataToSave = {
      title: data.title,
      description: data.description,
      status: data.status,
      date: data.date,
      createdAt: today,
      updatedAt: "",
    };
    payload.push(dataToSave);
    setAgenda(payload);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          setAgenda(formatData(results.data));
        },
      });
    }
  };

  const deleteItem = (index) => {
    let data = [...agenda];
    data.splice(index, 1);
    console.log(data, "love is all we have");
    setAgenda(data);
  };

  const downloadCsvFile = () => {
    var csv = Papa.unparse(agenda);
    const outputFilename = `results.csv`;
    // file file actions.
    const url = URL.createObjectURL(new Blob([csv]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", outputFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <header className="text-center my-5">
        <h1>Agenda Test task</h1>
      </header>
      <div className="row">
        <div className="col-md-4">
          <form
            className="row g-3 needs-validation"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-md-12">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                {...register("title")}
              />
              {errors.title && errors.title.message && (
                <ValidationText
                  status={"error"}
                  message={errors.title.message}
                />
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                {...register("date")}
              />
              {errors.date && errors.date.message && (
                <ValidationText
                  status={"error"}
                  message={errors.date.message}
                />
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                id="status"
                {...register("status")}
              >
                <option value="">Choose...</option>
                <option value={"Active"}>Active</option>
                <option value={"Deactivate"}>Deactivate</option>
              </select>
              {errors.status && errors.status.message && (
                <ValidationText
                  status={"error"}
                  message={errors.status.message}
                />
              )}
            </div>
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <textarea
                // type="date"
                className="form-control"
                id="description"
                {...register("description")}
              />
              {errors.description && errors.description.message && (
                <ValidationText
                  status={"error"}
                  message={errors.description.message}
                />
              )}
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">Upload CSV</label>
              <input
                className="form-control"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                type={"file"}
              />
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">TITLE</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col">STATUS</th>
                <th scope="col">DATE</th>
                <th scope="col">CREATED AT</th>
                <th scope="col">UPDATED AT</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {agenda.length === 0 && (
                <p className="text-center">Please add agenda</p>
              )}
              {agenda.map((x, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{x.title}</td>
                  <td>{x.description}</td>
                  <td>{x.status}</td>
                  <td>{x.date}</td>
                  <td>{x.createdAt}</td>
                  <td>{x.updatedAt}</td>
                  <td>
                    <button
                      onClick={() => {
                        deleteItem(i);
                      }}
                    >
                      Delete
                    </button>
                    <button>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center">
            <button onClick={downloadCsvFile}>Download file</button>
            <button
              onClick={() => {
                setAgenda([]);
              }}
            >
              Delete all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
