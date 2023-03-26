import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { colors } from '../utils';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const AddVehicleForm = () => {
    const [category, setCategory]=useState(["Car"]);
    const vehicleFormValidationSchema = Yup.object().shape({
        vehiclename: Yup.string().required("Vehicle Name Required").min(5),
        regNo: Yup.string().required("Registration number is Required"),
        category: Yup.string().required("Category is Required"),
        model: Yup.number().required("Enter Model"),
        color: Yup.string().required("Select a Color"),
        type: Yup.string().required("Select Type Please"),
        price: Yup.number().required("Enter your vehicle value")
      });
      return (
        <Grid container sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Formik
           initialValues={{ vehiclename: '',regNo:"", category:"", model: 0, color:'', type:'', price:0, }}
           validationSchema={vehicleFormValidationSchema}
           onSubmit={(values, { setSubmitting  }) => {
            console.log("Values", values)
           }}
         >
           {({
             values,
             errors,
             touched,
             handleChange,
             handleBlur,
             handleSubmit,
             isSubmitting,
           }) => (
             <form onSubmit={handleSubmit}>
                <Grid sx={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                    <Grid sx={{display:"flex", flexDirection:"row", columnGap:"10px"}}>
                    <Grid sx={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                <FormLabel>Vehicle Name</FormLabel>
                <TextField
                 required
                 name='vehiclename'
                 id="vehiclename"
                 label="vehicle Name"
                 defaultValue={values.vehiclename}
                 onChange={handleChange}
                />
                { <span style={{color:"red"}}>
                    *{errors.vehiclename && errors.vehiclename && errors.vehiclename}
                </span> }
                </Grid>
                <Grid sx={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                <FormLabel>Vehicle Registration Number</FormLabel>
                <TextField
                 required
                 name='regNo'
                 id="regNo"
                 label="Registration No"
                 defaultValue={values.regNo}
                 onChange={handleChange}
                />
                 {<span style={{color:"red"}}>
                    *{errors.regNo && errors.regNo && errors.regNo}
                </span> }
                </Grid>
                <Grid sx={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                <FormLabel>Category</FormLabel>
                <Select
                labelId="category"
                name="category"
                id="category"
                value={values.category}
                label="Select vehicle Category"
                onChange={handleChange}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {category.map((item)=>(
                    <MenuItem value={item}>{item}</MenuItem>
                ))}
                </Select>
                {<span style={{color:"red"}}>
                    *{errors.category && errors.category && errors.category}
                </span> }
                </Grid>
                </Grid>
                <Grid sx={{display:"flex", flexDirection:"row", columnGap:"10px"}}>
                <Grid sx={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                <FormLabel>Vehicle Model</FormLabel>
                <TextField
                required
                type="number"
                name='model'
                id="model"
                label="Enter Model"
                defaultValue={values.model}
                onChange={handleChange}
                />
                {<span style={{color:"red"}}>
                    *{errors.model && errors.model && errors.model}
                </span> }
                </Grid>

                <Grid sx={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                <FormLabel>Vehicle Color</FormLabel>
                <Select
                labelId="color"
                name="color"
                id="color"
                value={values.color}
                label="Select vehicle Color"
                onChange={handleChange}
                >
                {colors.map((item)=>(
                    <MenuItem value={item}>{item}</MenuItem>
                ))}
                </Select>
                {<span style={{color:"red"}}>
                    *{errors.color && errors.color && errors.color}
                </span> }
                </Grid>
                <Grid sx={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                <FormLabel>Vehicle Price</FormLabel>
                <TextField
                required
                type="number"
                name='price'
                id="price"
                label="Enter Price"
                defaultValue={values.price}
                onChange={handleChange}
                />
                {<span style={{color:"red"}}>
                    *{errors.price && errors.price && errors.price}
                </span> }
                </Grid>
                </Grid>
                <Grid sx={{display:"flex", flexDirection:"row", columnGap:"10px"}}>
                <Grid sx={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                <FormLabel>Vehicle Type</FormLabel>
                <RadioGroup
                    id="type"
                    aria-labelledby="type"
                    defaultValue={values.type}
                    name="type"
                    onChange={handleChange}
                >
                    <FormControlLabel value="new" control={<Radio />} label="New" />
                    <FormControlLabel value="used" control={<Radio />} label="Used" />
                </RadioGroup>
                {<span style={{color:"red"}}>
                    *{errors.type && errors.type && errors.type}
                </span> }
                </Grid>
                </Grid>
                <Grid sx={{display:"flex", justifyContent:"flex-end"}}>
                <Button type="submit" variant="contained" onClick={()=>handleSubmit} endIcon={<SendIcon />}>
                    Register Vehicle
                </Button>
                </Grid>
                </Grid>
             </form>
           )}
         </Formik>
        </Grid>
      )
}

export default AddVehicleForm;