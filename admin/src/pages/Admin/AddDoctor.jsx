import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("image Not Selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("about", about);

      // consol.log form data
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="m-5 w-full flex flex-col items-center"
    >
      <p className="mb-5 text-2xl font-semibold text-gray-800">Add Doctor</p>

      <div className="bg-white px-10 py-8 border shadow-lg rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center gap-4 mb-6 text-gray-600">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 h-16 bg-gray-200 rounded-full border p-2 hover:opacity-80"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-gray-700">
            Upload Doctor <br /> Picture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="flex flex-col gap-4">
            <div>
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300"
              >
                {[...Array(10).keys()].map((year) => (
                  <option key={year} value={`${year + 1} Years`}>
                    {year + 1} Years
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300"
              >
                {[
                  "General Physician",
                  "Dermatologist",
                  "Gastroenterologist",
                  "Neurology",
                  "Gynecologist",
                  "Pediatrician",
                ].map((speciality) => (
                  <option key={speciality} value={speciality}>
                    {speciality}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Qualifications</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Qualifications"
                required
              />
            </div>
            <div>
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Address Line 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300 mt-2"
                type="text"
                placeholder="Address Line 2"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p>About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Write about the doctor"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-all px-10 py-3 mt-5 text-white font-semibold rounded-full shadow-md"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
