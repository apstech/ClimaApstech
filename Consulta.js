import React, { useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import 'moment/locale/pt';

const Consulta = () => {
  const [form, setForm] = useState({})
  const [data, setData] = useState([])
  const [terceiro_dia,setTerceirodia] = useState('--------')
  const [carregaTable,setCarregaTable] = useState(false)

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  const consultaidCidade = id => {
    axios
      .get(
        'https://apiadvisor.climatempo.com.br/api/v1/forecast/locale/' +
          id +
          '/days/15?token=0d4c30cef5e44aa2772e44b9d1c75c99'
      )
      .then(res => {
        console.log(res.data.data);
        for (let i=3; i <=6; i++){
          delete res.data.data[i]
        }
        setTerceirodia(Moment(res.data.data[2].date).format('dddd'));
        setData(res.data.data);
      })
  }
  const pesquisa = () => {
    axios
      .get(
        'https://apiadvisor.climatempo.com.br/api/v1/locale/city?name=' +
          form.cidade +
          '&state=' +
          form.uf +
          '&token=0d4c30cef5e44aa2772e44b9d1c75c99'
      )
      .then(res => {
        if (res.data.length !== 0) {
          consultaidCidade(res.data[0].id)
          carregarTabela(true)
          setCarregaTable(true)
        } else {
          alert(
            'Cidade não cadastrada para essa conta!\n Utilize Cidade de Araçatuba e UF São Paulo'
          );
          carregarTabela(false)
          setCarregaTable(false)
          setTerceirodia('------')
        }
      });
  }
  const alingTable = {
    verticalAlign: 'inherit',
    border: '1px solid'
  }

  const carregarTabela = retorno => {
    if (retorno){
      return (
        <table className='table'>
          <thead className='table-danger' style={alinhamento}>
            <tr>
              <th scope='col' style={alingTable}>Hoje</th>
              <th scope='col' style={alingTable}>Amanhã</th>
              <th scope='col' style={alingTable}>{terceiro_dia}</th>
            </tr>
          </thead>
          <tbody style={alinhamento}>
          <tr>{data.map(renderizaLinha)}</tr>
          </tbody>
        </table>
      )
    }else{
      return (
        <table className='table'>
        </table>
      )
    }
  }
  let imgs ='';
  const renderizaLinha = record => {
    let frase,temperaturaMin,temperaturaMax,icone,hora; 
    hora = parseInt(Moment().format('HH'))
    //valida qual o horario da pesquisa para Status,temperatura e icones 
    if (hora < 12 && hora > 6) {
      frase = record.text_icon.text.phrase.morning
      temperaturaMin = record.temperature.morning.min
      temperaturaMax = record.temperature.morning.max
      icone = '../icones/'+record.text_icon.icon.morning+'.png'
    } else if(hora < 18 && hora > 12) {
      frase = record.text_icon.text.phrase.afternoon
      temperaturaMin = record.temperature.afternoon.min
      temperaturaMax = record.temperature.afternoon.max
      icone = '../icones/'+record.text_icon.icon.afternoon+'.png'
    } else if(hora > 18 && hora < 0) {
      frase = record.text_icon.text.phrase.night
      temperaturaMin = record.temperature.night.min
      temperaturaMax = record.temperature.night.max
      icone = '../icones/'+record.text_icon.icon.night+'.png'
    }else if(hora >= 0 || hora <= 6) {
      frase = record.text_icon.text.phrase.dawn
      temperaturaMin = record.temperature.dawn.min
      temperaturaMax = record.temperature.dawn.max
      icone = '../icones/'+record.text_icon.icon.dawn+'.png'
    }
    
    if (imgs ===''){
      imgs = <img src={icone} className='img-fluid' alt={icone} />
    }else{
      imgs = <p>min: {temperaturaMin}° max: {temperaturaMax}°</p>
    }
    return (

      <td key={record.date} style={alingTable}>
        <div id='status_dia'>       
          <b>{imgs}</b>
          <h1>{temperaturaMax}°C</h1>
          <p>{frase}</p>
        </div>
      </td>
    )
  }
  const alinhamento = {
    textAlign: 'center'
  }

  return (
    <div className='container'>
      <form>
        <div className='row'>
          <div className='col-md-6'>
            <div className='input-group mb-3'>
              <input
                type='text'
                value={form.cidade || ''}
                id='cidade'
                onChange={onChange('cidade')}
                className='form-control'
                placeholder='Informe a Cidade'
                aria-label='Cidade'
                aria-describedby='basic-addon1'
              />
            </div>
          </div>
          <div className='col-md-2'>
            <div className='input-group'>
              <select
                className='custom-select'
                id='uf'
                onChange={onChange('uf')}
                aria-label='Example select with button addon'
                selected
              >
                <option value=''>UF</option>
                <option value='AC'>Acre</option>
                <option value='AL'>Alagoas</option>
                <option value='AP'>Amapá</option>
                <option value='AM'>Amazonas</option>
                <option value='BA'>Bahia</option>
                <option value='CE'>Ceará</option>
                <option value='DF'>Distrito Federal</option>
                <option value='ES'>Espírito Santo</option>
                <option value='GO'>Goiás</option>
                <option value='MA'>Maranhão</option>
                <option value='MT'>Mato Grosso</option>
                <option value='MS'>Mato Grosso do Sul</option>
                <option value='MG'>Minas Gerais</option>
                <option value='PA'>Pará</option>
                <option value='PB'>Paraíba</option>
                <option value='PR'>Paraná</option>
                <option value='PE'>Pernambuco</option>
                <option value='PI'>Piauí</option>
                <option value='RJ'>Rio de Janeiro</option>
                <option value='RN'>Rio Grande do Norte</option>
                <option value='RS'>Rio Grande do Sul</option>
                <option value='RO'>Rondônia</option>
                <option value='RR'>Roraima</option>
                <option value='SC'>Santa Catarina</option>
                <option value='SP'>São Paulo</option>
                <option value='SE'>Sergipe</option>
                <option value='TO'>Tocantins</option>
              </select>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='input-group'>
              <button
                type='button'
                onClick={pesquisa}
                className='btn btn-outline-dark'
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </form>
      {carregarTabela(carregaTable)}
  </div>
  );
};
export default Consulta;
