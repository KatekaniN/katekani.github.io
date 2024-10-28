import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database"; // Import Realtime Database functions
import Alert from "@mui/material/Alert";
import { databaseURL } from "../../firebase"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

const isPostalCodeValid = (code) => /^\d{4}$/.test(code);
const isCellNumberValid = (number) => /^\d{10}$/.test(number);
const isCIPCRegistrationValid = (registration) =>
  /^[A-Za-z]\d{12}$/.test(registration);
const isDescriptionValid = (description) => description.length >= 250;

function isInputANumber(idNumber) {
  return /^\d+$/.test(idNumber);
}

function isInputValid(idNumber) {
  return (
    typeof idNumber === "string" &&
    isInputANumber(idNumber) &&
    idNumber.length === 13
  );
}

function isDateValid(idNumber) {
  const year = parseInt(idNumber.slice(0, 2), 10);
  const month = parseInt(idNumber.slice(2, 4), 10);
  const day = parseInt(idNumber.slice(4, 6), 10);

  const leapYear =
    year % 400 === 0 ||
    (year % 4 === 0 && year % 100 !== 0 && month === 2 && day <= 29);

  if (month === 2) {
    return (leapYear && day <= 29) || (!leapYear && day <= 28);
  } else if ([4, 6, 9, 11].includes(month)) {
    return day <= 30;
  } else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    return day <= 31;
  }

  return false;
}

function isCitizenshipStatusValid(idNumber) {
  const citizen = parseInt(idNumber.slice(10, 11));
  return citizen === 1 || citizen === 0;
}

function isCheckSumValid(idNumber) {
  const idArray = `${idNumber}`
    .split("")
    .reverse()
    .map((x) => Number.parseInt(x));
  const firstDigit = idArray.shift();
  let sum = idArray.reduce(
    (accumulator, currentValue, currentIndex) =>
      currentIndex % 2 !== 0
        ? accumulator + currentValue
        : accumulator +
          ((currentValue *= 2) > 9 ? currentValue - 9 : currentValue),
    0
  );
  sum += firstDigit;
  return sum % 10 === 0;
}

function isIdNumberValid(idNumber) {
  return (
    isInputValid(idNumber) &&
    isDateValid(idNumber) &&
    isCitizenshipStatusValid(idNumber) &&
    isCheckSumValid(idNumber)
  );
}

const BusinessDetailsForm = () => {
  const [directors, setDirectors] = useState([
    { name: "", id: "", contact: "" },
  ]);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    contactDetails: "",
    businessAddress: "",
    businessContactDetails: "",
    avgMonthlySales: "",
    monthlyExpenses: "",
    postalCode: "",
    paymentProvider: "",
    paymentProviderStatement: "",
    cipcRegistration: "",
    businessDuration: "",
    businessDescription: "",
    grossSales: "",
    assets: "",
    expensesLiabilities: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    console.error("User not signed in!");
    return; // Stop execution if no user
  }

  const userId = user.uid;
  const db = getDatabase();
  const bizbackerRef = ref(db, `users/${userId}/businessDetails`);

  try {
    // Prepare data for Realtime Database
    const dataToStore = {
      ...formData,
      directors,
      userId: user.uid, // Include user ID
      timestamp: new Date().toISOString(), // Store timestamp as a string
    };

    // Push data to Realtime Database
    await push(bizbackerRef, dataToStore); // Await the push operation

    setSuccessMessage("Business details submitted successfully!");

    // Reset form data
    setFormData({
      businessName: "",
      businessType: "",
      contactDetails: "",
      businessAddress: "",
      businessContactDetails: "",
      avgMonthlySales: "",
      monthlyExpenses: "",
      postalCode: "",
      paymentProvider: "",
      paymentProviderStatement: "",
      cipcRegistration: "",
      businessDuration: "",
      businessDescription: "",
      grossSales: "",
      assets: "",
      expensesLiabilities: "",
    });
    setDirectors([{ name: "", id: "", contact: "" }]); // Reset directors
  } catch (error) {
    console.error("Error submitting business details:", error);
  }
};

  const handleDirectorChange = (index, field, value) => {
    const updatedDirectors = [...directors];
    updatedDirectors[index][field] = value;

    if (field === "id") {
      if (!isIdNumberValid(value)) {
        console.warn("Invalid ID Number");
      }
    }

    setDirectors(updatedDirectors);
  };

  const handleAddDirector = () => {
    setDirectors([...directors, { name: "", id: "" }]);
  };

  const handleRemoveDirector = (index) => {
    setDirectors(directors.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundImage: "linear-gradient(0deg, #E0F7FA , #E0F7FA   )",
        borderRadius: "8px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          marginBottom: 10,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "30px",
          color: "#364961 ",
        }}
      >
        Tell us more about your business
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ color: "#364961 " }}>
            Director Details
          </Typography>
          {directors.map((director, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: 2,
                display: "flex",
                alignItems: "center",
                color: "#364961",
              }}
            >
              <TextField
                fullWidth
                label="Director Name"
                value={director.name}
                //required
                onChange={(e) =>
                  handleDirectorChange(index, "name", e.target.value)
                }
                sx={{ marginBottom: 1, marginRight: 2 }}
              />
              <TextField
                fullWidth
                label="Director ID Number"
                value={director.id}
                //required
                onChange={(e) =>
                  handleDirectorChange(index, "id", e.target.value)
                }
                error={!isIdNumberValid(director.id) && director.id.length > 0}
                helperText={
                  !isIdNumberValid(director.id) && director.id.length > 0
                    ? "Invalid ID number"
                    : ""
                }
                sx={{ marginBottom: 1, marginRight: 2 }}
              />
              <TextField
                fullWidth
                label="Director Contact Number"
                //required
                name="contactDetails"
                value={formData.contactDetails}
                onChange={(e) =>
                  setFormData({ ...formData, contactDetails: e.target.value })
                }
                error={
                  !isCellNumberValid(formData.contactDetails) &&
                  formData.contactDetails.length > 0
                }
                helperText={
                  !isCellNumberValid(formData.contactDetails) &&
                  formData.contactDetails.length > 0
                    ? "Contact number must be a 10-digit number"
                    : ""
                }
                sx={{ marginBottom: 2 }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveDirector(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={handleAddDirector}
            sx={{ marginBottom: 2, color: "#364961 " }}
          >
            Add Another Director
          </Button>
        </Box>
        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h6" gutterBottom sx={{ color: "#364961" }}>
          Business Details
        </Typography>
        <TextField
          fullWidth
          label="Business Name"
          //required
          name="businessName"
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            fullWidth
            label="CIPC Registration Number"
            //required
            name="cipcRegistration"
            value={formData.cipcRegistration}
            onChange={(e) =>
              setFormData({ ...formData, cipcRegistration: e.target.value })
            }
            error={
              !isCIPCRegistrationValid(formData.cipcRegistration) &&
              formData.cipcRegistration.length > 0
            }
            helperText={
              !isCIPCRegistrationValid(formData.cipcRegistration) &&
              formData.cipcRegistration.length > 0
                ? "CIPC registration number must start with a letter and be 13 characters long"
                : ""
            }
            sx={{ marginBottom: 2 }}
          />

          <Tooltip title="This is the alpha-numeric number your business is registered under with the CIPC">
            <IconButton sx={{ marginLeft: 3 }}>
              <InfoIcon color="#364961" />
            </IconButton>
          </Tooltip>
        </Box>
        <TextField
          fullWidth
          label="Business Description"
          //required
          name="businessDescription"
          value={formData.businessDescription}
          onChange={(e) =>
            setFormData({ ...formData, businessDescription: e.target.value })
          }
          error={
            !isDescriptionValid(formData.businessDescription) &&
            formData.businessDescription.length > 0
          }
          helperText={
            !isDescriptionValid(formData.businessDescription) &&
            formData.businessDescription.length > 0
              ? "Description must be at least 250 characters"
              : ""
          }
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Business Contact Number"
          //required
          name="contactDetails"
          value={formData.businessContactDetails}
          onChange={(e) =>
            setFormData({ ...formData, businessContactDetails: e.target.value })
          }
          error={
            !isCellNumberValid(formData.businessContactDetails) &&
            formData.businessContactDetails.length > 0
          }
          helperText={
            !isCellNumberValid(formData.businessContactDetails) &&
            formData.businessContactDetails.length > 0
              ? "Contact number must be a 10-digit number"
              : ""
          }
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Average Monthly Sales "
          type="number"
          //required
          name="avgMonthlySales"
          onChange={(e) =>
            setFormData({ ...formData, avgMonthlySales: e.target.value })
          }
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Gross Sales (Card)"
          type="number"
          //required
          name="grossSales"
          onChange={(e) =>
            setFormData({ ...formData, grossSales: e.target.value })
          }
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Estimated Monthly Expenses"
          //required
          name="monthlyExpenses"
          onChange={(e) =>
            setFormData({ ...formData, monthlyExpenses: e.target.value })
          }
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Who is your Payment Provider?"
            name="paymentProvider"
            //required
            onChange={(e) =>
              setFormData({ ...formData, paymentProvider: e.target.value })
            }
          />
          <Tooltip
            title="This is the service you use to handle digital payments to your store (e.g. FNB). 
          We connect to your account with your payment provider in order to redirect a percentage for each transaction"
          >
            <IconButton sx={{ marginLeft: 3 }}>
              <InfoIcon color="#364961" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg"
            id="paymentProviderStatement"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              setFormData({ ...formData, paymentProviderStatementFile: file }); // New field for the file
            }}
          />
          <label htmlFor="paymentProviderStatement">
            <Button
              variant="outlined"
              component="span"
              fullWidth
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                padding: "12px",
                borderColor: "#ccc",
                color: "#364961",
              }}
            >
              <UploadFileIcon sx={{ marginRight: 1, color: "#364961" }} />{" "}
              {/* Upload icon */}
              {formData.paymentProviderStatementFile
                ? formData.paymentProviderStatementFile.name
                : "Upload your latest statement from your payment provider"}
            </Button>
          </label>
          <Tooltip title="We scan the document to map out your digital transaction history to establish transaction history and assess funding ability">
            <IconButton sx={{ marginLeft: 3 }}>
              <InfoIcon color="#364961" />
            </IconButton>
          </Tooltip>
        </Box>

        <TextField
          fullWidth
          type="number"
          label="How many years has your business been active for?"
          //required
          name="businessDuration"
          onChange={(e) =>
            setFormData({ ...formData, businessDuration: e.target.value })
          }
          sx={{ marginBottom: 2 }}
        />

        <Typography variant="h6" gutterBottom sx={{ color: "#364961 " }}>
          Business Address Details
        </Typography>

        <TextField
          fullWidth
          label="Street Name"
          // required
          name="streetName"
          onChange={(e) =>
            setFormData({ ...formData, streetName: e.target.value })
          }
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Region"
          //required
          name="region"
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="City"
          //required
          name="city"
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Postal Code"
          //required
          name="postalCode"
          value={formData.postalCode}
          onChange={(e) =>
            setFormData({ ...formData, postalCode: e.target.value })
          }
          error={
            !isPostalCodeValid(formData.postalCode) &&
            formData.postalCode.length > 0
          }
          helperText={
            !isPostalCodeValid(formData.postalCode) &&
            formData.postalCode.length > 0
              ? "Postal code must be a 4-digit number"
              : ""
          }
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, color: "#E0F7FA ", bgcolor: "#364961" }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default BusinessDetailsForm;
