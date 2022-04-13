import React, { useState, useEffect } from "react";
import Card from "./Card";
import UploadedCard from "./UploadedCard";
import axios from "axios";
import '../style/style.css'



function App() {
  const url = process.env.NODE_ENV === "development" ? 'http://127.0.0.1:8000' : process.env.REACT_APP_API_URL;

  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)
  const [percentage, setPercentage] = useState(0)

  const [uploaded, setUploaded] = useState(false)
  const [response, setResponse] = useState()

  useEffect(() => {
    if (percentage === 100) {
      setTimeout(() => {
        setPercentage(0)
        setLoading(false)
        setFile()
      }, 5000)

    }
  }, [percentage])


  useEffect(() => {
    async function postImage() {
      setLoading(true)
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }, onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor(loaded * 100 / total);
          console.log(`${loaded}kb of ${total} | percentage: ${percent}%`);

          if (percent < 100) {
            setPercentage(percent)
          }}};
      let formData = new FormData();
      formData.append('image', file.image);
      formData.append('name', file.name);
      const res = await axios.post(url + '/api/images/', formData, config);
      setPercentage(100)
      return res
    }

    async function getImage(data) {
      const newURL = url + '/api/images/' + data.id + "/"
      const res = await axios.get(newURL);
      return res
    }

    if (file) {
      try {
        postImage()
          .then(res => {
            if (res.status === 201) {
              console.log(res);
              getImage(res.data)
              setResponse(res.data);
              // console.log(resp.data);
              setUploaded(true)
            };
          })
      } catch (error) {
        console.error(error);
      }
    };

  }, [file])

  return (
    <div className="App">
      {uploaded
        ? <UploadedCard
          url={ url }
          response={ response }
        />
        : <Card setFile={ setFile } loading={ loading } percentage={ percentage } />}

      <footer>
        <p>created by <a href="https://devchallenges.io/portfolio/dportillo23">Daniel Portillo</a> - devChallenges.io</p>
      </footer>
    </div>
  );
}

export default App;
