import React, {useState} from 'react';
import axios from 'axios'
import { BASE_URL } from "../Config/config.json";
import M from 'materialize-css';

function App() {

    const [brandname, setBrandname] = useState("");
    const [campaign, setCampaign] = useState();
    const [user, setUser] = useState();
    const [user_acc, setUser_acc] = useState();
    const [user_rej, setUser_rej] = useState();
    const [influenceremail, setInfluenceremail] = useState("");
    const [status, setStatus] = useState("")

    const findBrand = async() => {
        try {
            await axios.post("http://localhost:5000/adminfindcampaign", {"brandName":brandname}).then((res) => {
                setCampaign(res.data.campaign);
                setUser(res.data.user);
                setUser_acc(res.data.user_acc);
                setUser_rej(res.data.user_rej);
            })
        } catch (e) {
            M.toast({html: e});
        }
    }

    const Table = () => {
      if(user) {
        return user.map((users, index) => {
          const {_id, fullName, gender, email, phone, city, instagram} = users;
          return (
            <tr key={_id} >
              <td>{fullName}</td>
              <td>{gender}</td>
              <td>{city}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{instagram}</td>
            </tr>
          )
        })
      }
    }

    const Table_acc = () => {
      if(user_acc) {
        return user_acc.map((users, index) => {
          const {_id, fullName, gender, email, phone, city, instagram} = users;
          return (
            <tr key={_id} >
              <td>{fullName}</td>
              <td>{gender}</td>
              <td>{city}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{instagram}</td>
            </tr>
          )
        })
      }
    }

    const Table_rej = () => {
      if(user_rej) {
        return user_rej.map((users, index) => {
          const {_id, fullName, gender, email, phone, city, instagram} = users;
          return (
            <tr key={_id} >
              <td>{fullName}</td>
              <td>{gender}</td>
              <td>{city}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{instagram}</td>
            </tr>
          )
        })
      }
    }

    return (
        <>
            <h1>Admin Portal</h1>
            <label for="brandname" >Brand Name:</label>
            <input id="brandname" type="text" value={brandname} onChange={(e) => setBrandname(e.target.value)} ></input>
            <button onClick={findBrand} className="buttnkk" >Submit</button>
            <h3>Shown Influencers:</h3>
            <table>
              <tbody>
                {Table()}
              </tbody>
            </table>
            <h3>Campaign Info:</h3>
            <h4>Accepted:</h4>
            <table>
              <tbody>
                {Table_acc()}
              </tbody>
            </table>
            <h4>Rejected:</h4>
            <table>
              <tbody>
                {Table_rej()}
              </tbody>
            </table>
            {/* <h3>Change Status:</h3>
            <label for="email" >Influencer Email:</label>
            <input id="email" type="text" value={influenceremail} onChange={(e) => setInfluenceremail(e.target.value)} ></input>
            <label>
            <input name="status" class="with-gap" type="radio" value="accepted" checked={status == "accepted"} ></input>
            <span>accepted</span>
            </label>
            <label>
            <input name="status" class="with-gap" type="radio" value="rejected" checked={status == "accepted"} ></input>
            <span>rejected</span>
            </label> */}
        </>
    )
}

export default App;