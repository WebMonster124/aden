import React, {useState,useEffect} from 'react';
import {
    Row,
    Col,    
    CloseButton,
    Modal 
} from 'react-bootstrap';
import Confirm_modal from '../modal/confirm_modal'
import Notification_modal from '../modal/notification_modal';
import './dashboard.scss';
import './vehicle.scss'
import { Link } from 'react-router-dom';
import Sidebar from './sidebar.js'
import { useDispatch } from 'react-redux'
import  {select_vehicle}  from '../../../redux/actions/VehiclestateActions';
import axios from 'axios';
import ImageUploading from 'react-images-uploading'; 
const Vehicle = () => {    
    const [modalshow, setModalshow] = useState(false);
    const [modaltitle, setModaltitle] = useState("Add new vehicel");
   
    const handleModalClose = () => setModalshow(false);
    const [modalId,setModalId] = useState()
    const [modalImageurl,setModalImageUrl]=useState([]);
    const dispatch = useDispatch();
    const [vehicles,setVehicles] = useState([]);
    const [modalName,setModalName] =useState();
    const [modalRate, setModalRate] = useState();
    const [modalPassenger,setModalPassenger] = useState();
    const [modalBag,setModalBag] = useState();
    const [images, setImages] = useState([]);
    const [confirmModalShow, setConfirmModalShow] = useState(false)
    const handleConfirmModalClose = () => setConfirmModalShow(false)
    const handleUpdateModal = (key) => {
        console.log(vehicles[key])
        setImages([]);
        setModalImageUrl(vehicles[key].Imgurls)
        setModalBag(vehicles[key].max_bags);
        setModalRate(vehicles[key].rate);
        setModalName(vehicles[key].name);
        setModalPassenger(vehicles[key].max_passenger);
        setModalId(vehicles[key].id);setModalshow(true);
        setModaltitle('Update this vehicle');
    }
    const handleModalShow = () => {
        setModalshow(true);
        setImages([]);
        setModalImageUrl([])
        setModalBag("");
        setModalRate("");
        setModalName("");
        setModalPassenger("");
        setModalId("");
        setModaltitle('add new vehicle');}
    const updateVehicle =  async () => {
        const formData = new FormData();
        let temp_files = []
        if (images)
            images.map((image)=>{
                temp_files.push(image.file)
            })
        
        {temp_files.map(file=>{
            formData.append("uploadImages", file);
          });}
        let temp={};
        temp.name = modalName;
        temp.max_passenger = modalPassenger;
        temp.rate = modalRate;
        temp.max_bags=modalBag;
        temp.images = images;
        
        if (modalId)
        {   temp.id = modalId;
            const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/vehicle/upload`,formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'boundary':'${form_data._boundary}'
                },
              });
              temp.urls=[]
            if (modalImageurl)
                modalImageurl.map(val=>
                    temp.urls.push(val.id))
            if (result.data.data)
                result.data.data.map(val=>
                    temp.urls.push(val.id))
            
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/vehicle/update`,temp)
            .then((res)=>{
                Fetchdata();
                setModalshow(false)
            })
        }
        else{
            const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/vehicle/upload`,formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'boundary':'${form_data._boundary}'
                },
              });
            temp.urls = [...result.data.data]
           
            ;
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/vehicle/create`,temp)
            .then((res)=>{
                Fetchdata();
                setModalshow(false)
            })
        }
    }
    const [ notificationModalShow, setNotificationModalShow ]=useState(false)
    const delete_vehicle = () =>{
        setConfirmModalShow(false)
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/vehicle/delete`,{id:deleteId})
        .then((res)=>{
            if (res.status === 200){
                
                dispatch(select_vehicle(res.data));
                setVehicles(res.data)
                setNotificationModalShow(true);
            }

        })
    }
    const handleNotificationModalClose = () => setNotificationModalShow(false)
    const [deleteId, setDeleteId] = useState()
    const handleDeleteModal = (id) => {
        setDeleteId(id)
        setConfirmModalShow(true)
    }
    const Fetchdata = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/vehicle/get`)
            .then((res)=>{
                dispatch(select_vehicle(res.data));
                setVehicles(res.data)
                console.log(vehicles)
            })
    }
    useEffect(()=>{   
            Fetchdata();
        },[])
    
    const maxNumber = 69;
    const onImageTempRemove = (index) => {
        var updatedList = Array.from(modalImageurl);
        if (Array.isArray(index)) {
            index.forEach(function (i) {
                updatedList.splice(i, 1);
            });
        }
        else {
            updatedList.splice(index, 1);
        }
        setModalImageUrl(updatedList)
    }
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    return (
        <div className='dashboard'>
            <Sidebar/>
            <div className='admin-vehicle content'>
                <div className='content-panel'>
                    <div className='content-panel__heading'>
                        <div className='caption'>
                            <h5>Registered Vehicle</h5>
                            <h5 className='date'>12:15 PM at 5th May 2022</h5>
                        </div>
                        <div className='dropdown'>
                            <div className='nav-item'>
                                <div className='button' onClick={handleModalShow}>
                                    <i className='fa fa-plus'></i>
                                    <h6>Add vehicle</h6>
                                </div>
                            </div>
                            <div className='nav-item'>
                                <div className='svg-container'>
                                    <Link to="/admin/notification">
                                        <i className='fa fa-bell'></i>
                                    </Link>
                                </div>
                            </div>
                            <div className='nav-item'>
                                <div className='user-container'>
                                    <i className='fa fa-user'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content-panel__content'>    
                        <Row>
                            <Col xs={12}>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='card-body__header'>
                                            <div className='caption'>
                                                <h5 style={{textTransform:'capitalize'}}>Cars</h5>
                                            </div>
                                        </div>
                                        <div className='card-body__content'>
                                            <table className='vehicle'>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Rate</th>
                                                    <th>Max Passenger</th>
                                                    <th>Max Bags</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                                {
                                                vehicles.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td><img src={`${process.env.REACT_APP_IMAGE_BASE_URL+val.Imgurls[0].name}`} alt="image11"/></td>
                                                        <td>{val.name}</td>
                                                        <td>${val.rate}</td>
                                                        <td>{val.max_passenger}</td>
                                                        <td>{val.max_bags}</td>
                                                        <td><h6 className='delete' onClick ={()=>handleDeleteModal(val.id)}>delete</h6></td>
                                                        <td><h6 className='update' onClick={()=>handleUpdateModal(key)}>update</h6></td>
                                                    </tr>
                                                )
                                                })}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Col>                         
                        </Row>
                    </div>
                </div>
            </div>
            <Modal className="vehicle-modal" show={modalshow} onHide={handleModalClose} aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Body>
                  
                        <Row>
                            <Col md={6}>
                                
                                <div className='modal-left'>
                                        <h5>{modaltitle}</h5>                                     
                                        <ImageUploading
                                            multiple
                                            value={images}
                                            onChange={onChange}
                                            maxNumber={maxNumber}
                                            dataURLKey="data_url"
                                        >
                                            {({
                                            imageList,
                                            onImageUpload,
                                            onImageRemoveAll,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps
                                            }) => (
                                            // write your building UI
                                            <>                                         
                                                <h6  onClick={onImageUpload} {...dragProps}>
                                                        Add image
                                                        &nbsp;
                                                </h6>
                                                <div className="modal-left__thumb" style={{display:'inline'}}> 
                                                    {modalImageurl ? modalImageurl.map((val,index)=>(
                                                        <div style={{marginRight:'50px',display:'inline-table',marginTop:'46px'}}>
                                                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL+val.name}`} alt="car"/>
                                                            <CloseButton onClick={() => onImageTempRemove(index)}/>
                                                        </div>
                                                      )):''}
                                                    {imageList.map((image, index) => (
                                                        
                                                    <div key={index} className="image-item" style={{display:'inline-block', marginTop:'25px', marginRight:'50px'}}>
                                                        <img src={image.data_url} alt="car"  width="195px" height="112px" />
                                                        <CloseButton onClick={() => onImageRemove(index)}/>
                                                    </div>
                                                    ))}
                                                </div>
                                            </>
                                            )}
                                        </ImageUploading>
                                </div>                        
                            </Col>
                            <Col md={6}>
                                <div className='modal-right'>
                                    <div className='input-wrapper'>
                                        <h5>Name</h5>
                                        <input type="text" value={modalName} onChange={(e)=>setModalName(e.target.value)}></input>                 
                                    </div>
                                    <div className='input-wrapper'>
                                            <h5>Rate</h5>
                                            <input type="text" value={modalRate} onChange={(e)=>setModalRate(e.target.value)}></input>
                                    </div>
                                    <div className='input-wrapper'>
                                            <h5>Max Passenger</h5>
                                            <input type="text" value={modalPassenger} onChange={(e)=>setModalPassenger(e.target.value)}></input>
                                    </div>
                                    <div className='input-wrapper'>
                                            <h5>Max Bags</h5>
                                            <input type="text" value={modalBag} onChange={(e)=>setModalBag(e.target.value)}></input>
                                    </div>  
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <h6 className='update' type="submit" onClick={updateVehicle}> {modaltitle}</h6>
                                    </div>                    
                                </div>
                            </Col>
                        </Row>
                </Modal.Body>
            </Modal>
            <Confirm_modal classProp="modal" content="Do you want to delete this vehicle from the record?" button_name="delete" modalTitle="Delete the Vehicle" delete_vehicle={delete_vehicle} show={confirmModalShow} onHide={handleConfirmModalClose}>
            </Confirm_modal> 
            <Notification_modal content="Vehicle has been Deleted Successfully" modalTitle="Vehicle deleted" show={notificationModalShow} onHide={handleNotificationModalClose}></Notification_modal>                                 
        </div>
    )    
};

export { Vehicle };