import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment, { now } from "moment";
import "moment/locale/pt";

const Consulta = () => {
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [idCidade, setidCidade] = useState("");
  const [data, setData] = useState([]);
  const [posicao, setPosicao] = useState(0);

  const onChangeC = evt => {
    setCidade(evt.target.value);
  };
  const onChangeU = evt => {
    setUf(evt.target.value);
  };
  const consultaidCidade = id => {
    axios
      .get(
        "https://apiadvisor.climatempo.com.br/api/v1/forecast/locale/" +
          id +
          "/days/15?token=0d4c30cef5e44aa2772e44b9d1c75c99"
      )
      .then(res => {
        console.log(res.data.data);
        setData(res.data.data);
      });
  };
  const pesquisa = () => {
    axios
      .get(
        "https://apiadvisor.climatempo.com.br/api/v1/locale/city?name=" +
          cidade +
          "&state=" +
          uf +
          "&token=0d4c30cef5e44aa2772e44b9d1c75c99"
      )
      .then(res => {
        if (res.data.length !== 0) {
          setidCidade(res.data[0].id);
          consultaidCidade(res.data[0].id);
        } else {
          alert(
            "Cidade não cadastrada para essa conta!\n Utilize Cidade de Araçatuba e UF São Paulo"
          );
        }
      });
  };

  const renderizaLinha = record => {
    return (
      <tr key={record.id}>
        <th scope="row">
          {Moment(record.date).format("dddd")}
          {" - "}
          {Moment(record.date).format("DD/MM/YYYY")}
        </th>
        <td>
          min: {record.temperature.min}° max: {record.temperature.max}°
        </td>
        <td>{record.text_icon.text.pt}</td>
      </tr>
    );
  };

  return (
    <div className="container">
      <h1 />
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="text"
                onChange={onChangeC}
                className="form-control"
                placeholder="Informe a Cidade"
                aria-label="Cidade"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="input-group">
              <select
                className="custom-select"
                onChange={onChangeU}
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
              >
                <option selected>UF</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <button
              type="button"
              onClick={pesquisa}
              className="btn btn-outline-dark"
            >
              Buscar
            </button>
          </div>
        </div>
      </form>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Temperatura</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>{data.map(renderizaLinha)}</tbody>
      </table>
    </div>
  );
};
export default Consulta;
