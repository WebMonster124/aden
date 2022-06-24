import { useEffect,useState } from 'react';
import {
    Modal,
    Row,
    Col,
    CloseButton
} from 'react-bootstrap';
import Select from 'react-select'
import './driver_modal.scss'
import ImageUploading from 'react-images-uploading';
import axios from 'axios' 
const DriverModal = (props) => {
    const { modalshow, modaltitle, handleModalClose, getDrivers,val} = props;
    const [ modalFirstName, setModalFirstName ]=useState();
    const [ modalLastName, setModalLastName ]= useState();
    const [ modalId, setModalId] = useState();
    const [ modalMobileNumber, setModalMobileNumber]=useState();
    const [ location, setLocation ]= useState();
    const [ active, setActive ]= useState(false);
    const [ registration, setRegisteration]=useState();
    const [ insurance, setInsurance]=useState();
    const [ inspection,setInspection]=useState();
    const [ backgroundCheck,setBackgroundCheck]=useState();
    const [ drivingLicense, setDrivingLicense ] = useState();
    const [ IdDocument, setIdDocument ] = useState();
    const [ images,setImages ] = useState();
    const maxNumber = 69;
    const [modalImageurl,setModalImageUrl]=useState([]);
    const options = [
        {label: 'On Duty', value:1},
        {label: 'Off Duty', value:0}
    ]
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
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
    const next = async () => {
        let temp = {}
        temp.first_name = modalFirstName;
        temp.last_name = modalLastName;
        temp.mobile_number = modalMobileNumber;
        temp.location = location;
        temp.vehicle_registration = registration;
        temp.vehicle_insurance = insurance;
        temp.vehicle_inspection = inspection;
        temp.background_check = backgroundCheck;
        temp.identify_document = IdDocument;
        temp.driving_license=drivingLicense;
        temp.availability = 0;
        const formData = new FormData();
        let temp_files = []
        console.log(temp_files)
        
        if (images)
            images.map((image)=>{
                temp_files.push(image.file)
            })
        
        {temp_files.map(file=>{
            formData.append("uploadImages", file);
          });}
        handleModalClose()
          if (modalId)
          {   temp.id = modalId;
              const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/driver/upload`,formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'boundary':'${form_data._boundary}'
                  },
                });
                temp.img_url=[]
              if (modalImageurl)
                  modalImageurl.map(val=>
                      temp.img_url.push(val.id))
              if (result.data.data)
                  result.data.data.map(val=>
                      temp.img_url.push(val.id))
              
              axios.post(`${process.env.REACT_APP_API_BASE_URL}/driver/update`,temp)
              .then((res)=>{
                  getDrivers();
                  
              })
          }
          else{
              const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/driver/upload`,formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'boundary':'${form_data._boundary}'
                  },
                });
              temp.urls = [...result.data.data]
              axios.post(`${process.env.REACT_APP_API_BASE_URL}/driver/create`,temp)
              .then((res)=>{
                getDrivers();
                
              })
          }
    }
    useEffect(()=>{
        if (val){
            setImages([])
            setModalFirstName(val.first_name)
            setModalLastName(val.last_name)
            setModalMobileNumber(val.mobile_number)
            setLocation(val.location)
            setRegisteration(val.vehicle_registration)
            setInsurance(val.vehicle_insurance)
            setInspection(val.vehicle_inspection)
            setModalId(val.id)
            setBackgroundCheck(val.background_check)
            setDrivingLicense(val.driving_license)
            setIdDocument(val.identify_document)
            setModalImageUrl(val.Imgurls)
            
        }
    },[val])
    return(
        <Modal className="driver-modal" show={modalshow} dialogClassName="modal-100w" onHide={handleModalClose} centered>
                <Modal.Header>
                    <h3 className={active?'':'active'} onClick={()=>setActive(false)}>{modaltitle}</h3>
                    <h3 className={active?'active':''} onClick={()=>setActive(true)}>Recomendation & Submission</h3>
                </Modal.Header>
                <Modal.Body>
                   <Row className={!active?'active':'display-none'}>
                       <Col md={6}>
                          <div className='modal-left'>
                              <div className='modal-left__thumb' style={{display:'flex',justifyContent:'center'}}>
                                <div style={{width:'100%'}}>
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
                                            <div style={{marginTop:'50px'}}> 
                                                <div className="btns" style={{display:'flex',justifyContent:'space-between'}}>                                        
                                                    
                                                    {
                                                        props.modaltitle != 'add new driver'?
                                                        <>
                                                            <h6  onClick={onImageUpload} {...dragProps} className="delete" style={{width:'300px'}}>
                                                                Add Image
                                                                &nbsp;
                                                            
                                                            </h6>
                                                            <h6 className='duty-select'>On Duty<i className='fas fa-chevron-down'></i></h6>
                                                        </>
                                                        :
                                                        <h6  onClick={onImageUpload} {...dragProps} className="delete">
                                                         Add Image
                                                         &nbsp;
                                                    
                                                        </h6>
                                                    }
                                                </div>
                                                <div className="modal-left__thumb" style={{display:'inline'}}> 
                                                    {modalImageurl ? modalImageurl.map((val,index)=>(
                                                        <div style={{marginRight:'50px',marginTop:'50px',display:'flex',justifyContent:'center'}} key={index}>
                                                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL+val.name}`} width="94px" height="94px" alt="car"/>
                                                            <CloseButton onClick={() => onImageTempRemove(index)}/>
                                                        </div>
                                                      )):''}
                                                    {imageList.map((image, index) => (
                                                        
                                                    <div key={index} className="image-item" style={{display:'flex',justifyContent:'center', marginTop:'72px', marginRight:'50px'}}>
                                                        <img src={image.data_url} alt="" width="94px" height="94px" />
                                                        <CloseButton onClick={() => onImageRemove(index)}/>
                                                    </div>
                                                    ))}
                                                </div>
                                            </div>
                                            )}
                                    </ImageUploading>
                                   
                                </div>            
                              </div>
                          </div>                        
                       </Col>
                       <Col md={6}>
                           <div className='modal-right'>
                               <div className='input-wrapper'>
                                   <h5>First Name</h5>
                                   <input type="text" value={modalFirstName} onChange={(e)=>setModalFirstName(e.target.value)}></input>
                                                    
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Last Name</h5>
                                    <input type="text" value={modalLastName} onChange={(e)=>setModalLastName(e.target.value)}></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Phone Numberr</h5>
                                    <input type="text" value={modalMobileNumber} onChange={(e)=>setModalMobileNumber(e.target.value)}></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Location</h5>
                                    <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)}></input>
                               </div>
                               <div>
                                   <h6 className='update' onClick={()=>{setActive(true)}} style={{widhth:'100%'}}>Next</h6>
                                </div>
                           </div>
                       </Col>
                   </Row>
                   <Row className={active?'active':'display-none'}>
                       <Col md={6}>
                       <div className='modal-right'>
                               <div className='input-wrapper'>
                                   <h5>vehicle Registration</h5>
                                   <input type="text" value={registration} onChange={(e)=>setRegisteration(e.target.value)}></input>
                                                    
                               </div>
                               <div className='input-wrapper'>
                                    <h5>vehicle Insurance</h5>
                                    <input type="text" value={insurance} onChange={(e)=>setInsurance(e.target.value)}></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>vehicle inspection</h5>
                                    <input type="text" value={inspection} onChange={(e)=>setInspection(e.target.value)}></input>
                               </div>
                           </div>                        
                       </Col>
                       <Col md={6}>
                           <div className='modal-right'>
                               <div className='input-wrapper'>
                                   <h5>Background Check</h5>
                                   <input type="text" value={backgroundCheck} onChange={(e)=>setBackgroundCheck(e.target.value)}></input>
                                                    
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Driving Licence</h5>
                                    <input type="text" value={drivingLicense} onChange={(e)=>setDrivingLicense(e.target.value)}></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Identity Document</h5>
                                    <input type="text" value={IdDocument} onChange={(e)=>setIdDocument(e.target.value)}></input>
                               </div>
                           </div>
                       </Col>
                       <h6 className='update' onClick={next}>Add driver</h6>
                   </Row>

                </Modal.Body>
            </Modal>
    )
}
export default DriverModal;