import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Profile() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setwallet] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setImage(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const profileSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/user-profile",
        {
          image,
          name,
          about,
          email,
          wallet,
        }
      );
      setImage("");
      setName("");
      setAbout("");
      setEmail("");
      setWallet("");
      setOk(data.ok);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="p-32">
      <form onSubmit={profileSubmit} action="">
        {image && (
          <div>
            <img
              className="rounded mt-4"
              width="500"
              height="500"
              src={image}
            />
          </div>
        )}
        <input onChange={onChange} name="image" type="file" />

        <button className="bg-lime-400 text-white px-4 py-2">Preview</button>
        <br />
        <br />
        <p>Username</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter username"
        />
        <br />
        <br />
        <p>Bio</p>
        <textarea
          onChange={(e) => setAbout(e.target.value)}
          value={about}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Tell the world you story!"
        ></textarea>
        <br />
        <br />
        <p>Email Address</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Enter email"
        />
        <br />
        <br />
        <p>Social Connections</p>
        <p>Help collectors verify your account by connecting Twitter</p>
        <div className="lg:grid grid-cols-2 gap-4">
          {/* <img src="./coinbase.png" width={50} /> */}
          <br />
          <button className="bg-lime-400 text-white px-4 py-2">Connect</button>
        </div>
        <br />
        <br />
        <p>Links</p>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Your Instagram link"
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Your website link"
        />
        <br />
        <br />
        <p>Wallet Address</p>
        <input
          onChange={(e) => setwallet(e.target.value)}
          value={wallet}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="0x1ac61a6v16a6c1a..."
        />
        <br />
        <br />
        <button type="submit" className="bg-lime-400 text-white px-4 py-2">
          {loading ? <SyncOutlined spin /> : "Save"}
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  const url = process.env.SERVER_API;
  console.log(`Server Connected to ENV: ${url}`);
}
