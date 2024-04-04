  import { useState} from "react"
  import Preloader from "./components/Preloader.js"
  import Test from "./components/Test.js"
  

  const App = () => {
    const [images, setImages] = useState(null)
    const [value, setValue] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null)
    const[modalOpen, setModalOpen] = useState(false)
    const surpriseOptions = [
      'a boy drawing a creative anime',
      'a girl riding motorcycle',
      'a indian women cooking tasty food in cartoon',
    ]

    const surpriseMe = () =>{
      setImages(null)
      const randomValue = surpriseOptions[Math.floor(Math.random()*surpriseOptions.length)]
      setValue(randomValue)
    }

    const getImages = async () => {
      setImages(null);
      setLoading(true);
      setError(null);
    
      try {
        if (!value) {
          throw new Error('Please provide a search term.');
        }
    
        const options = {
          method: "POST",
          body: JSON.stringify({ message: value }),
          headers: { 'Content-type': 'application/json' }
        };
    
        const response = await fetch('http://localhost:8000/images', options);
    
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }
    
        const responseData = await response.json();
    
        if (!Array.isArray(responseData.data)) {
          throw new Error('Invalid response received from the server.');
        }
    
        setImages(responseData.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    
    const uploadImage = async(e) =>{
      console.log(e.target.files[0])

      const formData = new FormData()
      formData.append('file', e.target.files[0])
      setModalOpen(true)
      setSelectedImage(e.target.files[0])
      e.target.value = null
      try{
        const options = {
          method: "POST",
          body: formData
        }
        const response = await fetch('http://localhost:8000/upload',options)
        const data = await response.json()
        console.log(data)
      }catch(error){
        console.error(error)
      }
    }

    const generateVariations = async () => {
      setImages(null);
      if (selectedImage === null) {
        setError('Error: must have an existing image');
        setModalOpen(false);
        return;
      }
      try {
        const options = { 
          method: 'POST',
          body: JSON.stringify({ n: 2 }), // Change the value of n as desired
          headers: { 'Content-Type': 'application/json' }
        };
        const response = await fetch('http://localhost:8000/variations', options);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'An error occurred while processing your request.');
        }
        setImages(data);
        setError(null);
        setModalOpen(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    
    


    return (
  
      <div className = "app">
      

        <section className = "search-section">
          <p> Give a detailed prompt<span className="surprise" onClick={surpriseMe}> Click for Surprise</span></p>
          <div className = "input-container">
            <input 
            value={value}
            placeholder="type your imagination.."
            onChange = {e => setValue(e.target.value)}
            />
            <button onClick={getImages} className="btn"> Generate</button>
          </div>
        <p className = "extra-info">
          Or, 
          <span>
          <label htmlFor="files"> Upload an image to create variations. </label>
            <input onChange ={uploadImage}id = "files" accept="image/*" type = "file" hidden/> 
          </span>
          </p>
          {error && <p>{error}</p>}
          {modalOpen && <div className = "overlay">
            <Test setModalOpen= {setModalOpen} setSelectedImage= {setSelectedImage}  selectedImage={selectedImage}
            generateVariations = {generateVariations}/>
          </div>}
        </section>
        <section className = "image-section">
        {loading && <Preloader/> }
        {images?.map((image, _index) => (
            <img key = {_index} src = {image.url} alt = {`Generated image of ${value}`}/>
          ))}
        </section>
      </div>
    );
  }

  export default App;
