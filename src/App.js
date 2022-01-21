import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./App.css";
import { useForm } from "react-hook-form";
import { ValidationText } from "./components/validationText/validationText";

const agendaSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
  date: yup.string().required("Date is required"),
});

function App() {
  const [agenda, setAgenda] = useState([
    {
      title: "",
      description: "",
      status: "",
      date: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agendaSchema),
  });
  const onSubmit = () => {
    console.log("we are really doing this now");
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
              <label className="form-label">
                Title
              </label>
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
              <label className="form-label">
                Date
              </label>
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
              <label className="form-label">
                Status
              </label>
              <select className="form-select" id="status" {...register("status")}>
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
              <label className="form-label">
                Description
              </label>
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
              <label className="form-label">
                Upload CSV
              </label>
              <input className="form-control" type={"file"} />
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
              {agenda.map((x, i) => (
                <tr key={i}>
                  <th scope="row">1</th>
                  <td>{x.title}</td>
                  <td>{x.description}</td>
                  <td>{x.status}</td>
                  <td>{x.date}</td>
                  <td>{x.createdAt}</td>
                  <td>{x.updatedAt}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button>Download file</button>
        </div>
      </div>
    </div>
  );
}

export default App;
