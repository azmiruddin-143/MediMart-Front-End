
import React from 'react';


const ManageMedicineCard = ({ medicine}) => {
    const { medicineName, genericName, shortDescription, medicineImage, medicineCategory, company, medicineMassUnit, perUnitPrice, discountPercentage } = medicine
    return (
        <div>

            <div>
                <img className='w-full h-[300px] object-cover rounded-md' src={medicineImage} alt="" />
                <div className='space-y-3 my-4 text-md'>
                    <h1>Medicine Name: {medicineName}</h1>
                    <h1>Generic Name: {genericName}</h1>
                    <h1>Short Description: {shortDescription}</h1>
                    <h1>Medicine Category: {medicineCategory}</h1>
                    <h1>Medicine Company: {company}</h1>
                    <h1>Medicine MassUnit: {medicineMassUnit}</h1>
                    <h1>Discount Percentage: {discountPercentage} % </h1>
                    <h1>PerUnit Price: {perUnitPrice} $</h1>                  
                </div>
            </div>

        </div>
    );
};

export default ManageMedicineCard;
