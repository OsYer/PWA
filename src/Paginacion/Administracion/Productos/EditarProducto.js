import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../Esquema/Header';
import Footer from '../../../Esquema/Footer';

import Sidebar from "../../../Esquema/Sidebar";
import { useDropzone } from 'react-dropzone';
import './AgregarProducto.css';
import Swal from 'sweetalert2';

import { baseURL } from '../../../api';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const dropzoneStyle = {
  border: '2px dashed #007bff',
  borderRadius: '5px',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
  cursor: 'pointer'
};

const EditarProducto = () => {
  const { id } = useParams();
  const [categoriaId, setCategoriaId] = useState('');
  const [subcategoriaId, setSubcategoriaId] = useState('');
  const [marcaId, setMarcaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [mostrarSubcategoria, setMostrarSubcategoria] = useState(false);
  const [mostrarMarca, setMostrarMarca] = useState(false);
  const [existingImageUrls, setExistingImageUrls] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducto() {
      // console.log("id parametro: ", id)
      const response = await fetch(`${baseURL}/products-editar/${id}`);
      const data = await response.json();
      console.log("data", data)
      
      setNombreProducto(data.nombre);
      setDescripcionProducto(data.descripcion);
      setPrecioBase(data.precio);
      setDescuentoPorcentaje(data.descuento);
      setPrecioFinal(data.precioFinal);
      setEstadoInventario(data.estadoInventario);
      setCantidadExistencias(data.existencias);
      const imageUrls = data.imagenes.map(url => ({
        preview: url,
        name: url.substring(url.lastIndexOf('/') + 1),
        isExisting: true
      }));
      setExistingImageUrls(imageUrls);

      setCategoriaId(data.ID_categoria);
      if (data.ID_categoria) {
        const subcategoriesResponse = await fetch(`${baseURL}/subcategoriasByIDCategoria/${data.ID_categoria}`);
        const subcategoriesData = await subcategoriesResponse.json();
        setSubcategorias(subcategoriesData);
  
        const brandsResponse = await fetch(`${baseURL}/marcasByIDCategoria/${data.ID_categoria}`);
        const brandsData = await brandsResponse.json();
        setMarcas(brandsData);
  
        setSubcategoriaId(data.ID_subcategoria);
        setMarcaId(data.ID_marca);
      }

      setFiles(data.imagenes.map(imagen => ({
        preview: imagen,
        name: imagen.substring(imagen.lastIndexOf('/') + 1)
      })));
    }
    fetchProducto();

  }, [id]);

  useEffect(() => {
    async function getCategorias() {
      const response = await fetch(`${baseURL}/categorias-productos`);
      const data = await response.json();
      setCategorias(data);
      // console.log(data)
    }
    getCategorias();
  }, []);

  const handleCategoriaChange = async (event) => {
    const selectedCategoriaId = event.target.value;
    // console.log(selectedCategoriaId)
    setCategoriaId(selectedCategoriaId);
    if (selectedCategoriaId !== '') {
      const response = await fetch(`${baseURL}/subcategoriasByIDCategoria/${selectedCategoriaId}`);
      const data = await response.json();
      setSubcategorias(data);
      setMostrarSubcategoria(true); const responseMarcas = await fetch(`${baseURL}/marcasByIDCategoria/${selectedCategoriaId}`);
      const dataMarcas = await responseMarcas.json();
      setMarcas(dataMarcas);
      setMostrarMarca(true);
    } else {
      setSubcategorias([]);
      setMostrarSubcategoria(false);
      setMarcas([]);
      setMostrarMarca(false);
    }
  };

  const [precioBase, setPrecioBase] = useState('');
  const [descuentoPorcentaje, setDescuentoPorcentaje] = useState('');
  const [precioFinal, setPrecioFinal] = useState('');

  const calcularPrecioFinal = () => {
    // Verificar si ambos campos tienen valores numéricos
    if (!isNaN(precioBase) && !isNaN(descuentoPorcentaje)) {
      const descuentoCantidad = (precioBase * descuentoPorcentaje) / 100;
      const final = precioBase - descuentoCantidad;
      setPrecioFinal(final.toFixed(2)); // Redondear a 2 decimales
    } else {
      // Mostrar mensaje de error si los campos no son numéricos
      alert('Por favor, ingrese valores numéricos válidos');
    }
  };

  const [files, setFiles] = useState([]);

  const [otrosFiles, setOtrosFiles] = useState([]);


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    onDrop: acceptedFiles => {
      const validFiles = acceptedFiles.filter(file => {
        if (file.type.startsWith('image/')) {
          return true;
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            imagenes: 'Solo se permiten imágenes'
          }));
          return false;
        }
      });

      setOtrosFiles(prevFiles => [
        ...prevFiles,
        ...validFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      ]);

    },
    maxSize: 1500000 // 1.5MB
  });

  const handleRemoveImage = (index, isExisting) => {
    if (isExisting) {
      setExistingImageUrls(prevFiles => prevFiles.filter((_, i) => i !== index));
    } else {
      setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }
  };

  const existingThumbs = existingImageUrls.map((file, index) => (
    <div key={file.preview} className="row align-items-center mb-3">
      <div className="col-2">
        <img
          src={file.preview}
          style={img}
        />
      </div>
      <div className="col-8">
        <p>{file.name}</p>
      </div>
      <div className="col-2 text-end">
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleRemoveImage(index, true)}
        >
          &times;
        </button>
      </div>
    </div>
  ));

  const newThumbs = otrosFiles.map((file, index) => (
    <div key={file.name} className="row align-items-center mb-3">
      <div className="col-2">
        <img
          src={file.preview}
          style={img}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
      <div className="col-8">
        <p>{file.name}</p>
        <p>{(file.size / 1024).toFixed(2)} KB</p>
      </div>
      <div className="col-2 text-end">
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleRemoveImage(index, false)}
        >
          &times;
        </button>
      </div>
    </div>
  ));
  useEffect(() => {
    return () => otrosFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }, [otrosFiles]);


  const [isLoadingSubcategorias, setIsLoadingSubcategorias] = useState(false);
  const [isLoadingMarcas, setIsLoadingMarcas] = useState(false);

  const [estadoInventario, setEstadoInventario] = useState('');
  const [cantidadExistencias, setCantidadExistencias] = useState('');

  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcionProducto, setDescripcionProducto] = useState('');


  const [errors, setErrors] = useState({});

  const handleEditarProducto = async (e) => {
    e.preventDefault();

    if (!validarCampos()) return;

    const formData = new FormData();
    formData.append('nombre', nombreProducto);
    formData.append('descripcion', descripcionProducto);
    formData.append('categoria', categoriaId);
    formData.append('subcategoria', subcategoriaId);
    formData.append('marca', marcaId);
    formData.append('precioBase', precioBase);
    formData.append('descuentoPorcentaje', descuentoPorcentaje);
    formData.append('precioFinal', precioFinal);
    formData.append('cantidadExistencias', cantidadExistencias);
    otrosFiles.forEach(file => {
      formData.append('images', file);
    });
  
    formData.append('existingImages', JSON.stringify(existingImageUrls.map(file => file.preview)));
  
    try {
      const response = await fetch(`${baseURL}/products/${id}`, {
        method: 'PUT',
        body: formData
      });
      const result = await response.json();

      if (response.ok && result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Producto editado',
          text: 'El producto se ha editado correctamente.',
        }).then(() => {
          navigate("/AdmProductos");
        });
      } else {
        console.error('Server Error:', response.statusText);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al editar el producto.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al editar el producto.',
      });
    }
  };


  const validarCampos = () => {
    const nuevosErrores = {};
    if (!nombreProducto) nuevosErrores.nombreProducto = 'El nombre es obligatorio';
    if (!descripcionProducto) nuevosErrores.descripcionProducto = 'La descripción es obligatoria';
    if (!categoriaId) nuevosErrores.categoriaId = 'La categoría es obligatoria';
    if (!subcategoriaId) nuevosErrores.subcategoriaId = 'La subcategoría es obligatoria';
    if (!marcaId) nuevosErrores.marcaId = 'La marca es obligatoria';
    if (!precioBase) nuevosErrores.precioBase = 'El precio base es obligatorio';
    if (!descuentoPorcentaje) nuevosErrores.descuentoPorcentaje = 'El descuento es obligatorio';
    if (!precioFinal) nuevosErrores.precioFinal = 'El precio final es obligatorio';
    if (estadoInventario === 'in-stock' && !cantidadExistencias) nuevosErrores.cantidadExistencias = 'La cantidad de existencias es obligatoria';
    if (files.length === 0) nuevosErrores.imagenes = 'Debe subir al menos una imagen';

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className='content container'>
          <h5 className="title_addproducto mb-3">Editar producto</h5>
          <div className="row g-0">
            <div className="col-lg-8 pe-lg-2">
              <div className="card mb-3">
                <div className="card-header bg-body-tertiary">
                  <h6 className="mb-0">Información básica</h6>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row gx-2">
                      <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="product-name">Nombre del producto:</label>
                        <input
                          className="form-control"
                          id="product-name"
                          type="text"
                          value={nombreProducto}
                          onChange={(e) => setNombreProducto(e.target.value)}
                        />
                        {errors.nombreProducto && <p className="text-danger">{errors.nombreProducto}</p>}
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="product-description">Descripción del producto:</label>
                        <textarea
                          className="form-control"
                          id="product-description"
                          rows="5"
                          value={descripcionProducto}
                          onChange={(e) => setDescripcionProducto(e.target.value)}
                        ></textarea>
                        {errors.descripcionProducto && <p className="text-danger">{errors.descripcionProducto}</p>}
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header bg-body-tertiary">
                  <h6 className="mb-0">Añadir imágenes</h6>
                </div>
                <div className="card-body">
                  <form className="dropzone dropzone-multiple p-0" id="dropzoneMultipleFileUpload" data-dropzone="data-dropzone" action="#!" data-options='{"acceptedFiles":"image/*"}'>
                    <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyle}>
                      <input {...getInputProps()} />
                      <p>Arrastra y suelta algunas imágenes aquí, o haz clic para seleccionar archivos (Max. 1.5MB)</p>
                    </div>
                    <aside style={thumbsContainer}>
                      {existingThumbs}
                    </aside>
                    <h6 className="mt-3">Nuevas imágenes</h6>
                    <aside style={thumbsContainer}>
                      {newThumbs}
                    </aside>
                  </form>
                  {errors.imagenes && <p className="text-danger">{errors.imagenes}</p>}
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-header bg-body-tertiary">
                  <h6 className="mb-0">Estado del inventario</h6>
                </div>
                <div className="card-body">
                  <div>
                    <label className="form-label" htmlFor="stock-quantity">Cantidad de existencias:</label>
                    <input
                      className="form-control" id="stock-quantity" type="number"
                      value={cantidadExistencias}
                      onChange={(e) => setCantidadExistencias(e.target.value)}
                    />
                    {errors.cantidadExistencias && <p className="text-danger">{errors.cantidadExistencias}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 ps-lg-2">
              <div className="sticky-sidebar">
                <div className="card mb-3">
                  <div className="card-header bg-body-tertiary">
                    <h6 className="mb-0">Tipo</h6>
                  </div>
                  <div className="card-body">
                    <div className="row gx-2">
                      <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="product-category">Selecciona una categoría:</label>
                        <select
                          className="form-select"
                          id="product-category"
                          name="product-category"
                          value={categoriaId}
                          onChange={handleCategoriaChange}
                        >
                          <option value="">Seleccione una categoría</option>
                          {categorias.map((categoria) => (
                            <option key={categoria.ID_categoria} value={categoria.ID_categoria}>
                              {categoria.nombre}
                            </option>
                          ))}
                        </select>
                        {isLoadingSubcategorias && <p>Cargando subcategorías...</p>}
                        {errors.categoriaId && <p className="text-danger">{errors.categoriaId}</p>}
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="product-subcategory">Selecciona una subcategoría:</label>
                        <select
                          className="form-select"
                          id="product-subcategory"
                          name="product-subcategory"
                          value={subcategoriaId}
                          onChange={(e) => setSubcategoriaId(e.target.value)}
                        >
                          <option value="">Seleccione una subcategoría</option>
                          {subcategorias.map((subcategoria) => (
                            <option key={subcategoria.ID_subcategoria} value={subcategoria.ID_subcategoria}>
                              {subcategoria.nombre}
                            </option>
                          ))}
                        </select>
                        {isLoadingMarcas && <p>Cargando marcas...</p>}
                        {errors.subcategoriaId && <p className="text-danger">{errors.subcategoriaId}</p>}
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="product-brand">Selecciona una marca:</label>
                        <select
                          className="form-select"
                          id="product-brand"
                          name="product-brand"
                          value={marcaId}
                          onChange={(e) => setMarcaId(e.target.value)}
                        >
                          <option value="">Seleccione una marca</option>
                          {marcas.map((marca) => (
                            <option key={marca.ID_marca} value={marca.ID_marca}>
                              {marca.nombre}
                            </option>
                          ))}
                        </select>
                        {errors.marcaId && <p className="text-danger">{errors.marcaId}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-header bg-body-tertiary">
                    <h6 className="mb-0">Precios</h6>
                  </div>
                  <div className="card-body">
                    <div className="row gx-2">
                      <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="base-price">Precio base:</label>
                        <input
                          className="form-control"
                          id="base-price"
                          type="number"
                          value={precioBase}
                          onChange={(e) => setPrecioBase(e.target.value)}
                        />
                        {errors.precioBase && <p className="text-danger">{errors.precioBase}</p>}
                      </div>
                      <div className="col-12 mb-4">
                        <label className="form-label" htmlFor="discount-percentage">Descuento en porcentaje:</label>
                        <input
                          className="form-control"
                          id="discount-percentage"
                          type="number"
                          value={descuentoPorcentaje}
                          onChange={(e) => setDescuentoPorcentaje(e.target.value)}
                        />
                        {errors.descuentoPorcentaje && <p className="text-danger">{errors.descuentoPorcentaje}</p>}
                      </div>
                      <div className="col-12">
                        <label className="form-label" htmlFor="final-price">Precio final:</label>
                        <input
                          className="form-control"
                          id="final-price"
                          type="text"
                          value={precioFinal}
                          readOnly
                        />
                        {errors.precioFinal && <p className="text-danger">{errors.precioFinal}</p>}
                      </div>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={calcularPrecioFinal}>Calcular Precio Final</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="card my-3">
            <div className="card-body">
              <div className="row justify-content-between align-items-center">
                <div className="col-md">
                  <h5 className="title mb-2 mb-md-0"> </h5>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-link text-secondary p-0 me-3 fw-medium no-underline"
                    onClick={() => navigate("/AdmProductos")}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={handleEditarProducto}>
                    Editar producto
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditarProducto;