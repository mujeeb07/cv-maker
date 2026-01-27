import React from 'react'

function PersonalForm({cv, setCv}) {

  const handleChange = (e) => {
    setCv({
        ...cv,
        personal: {
            ...cv.personal,
            [e.target.name] : e.target.value
        }
    });
  };

  return (
    <div className='mb-6 '>
        <h2 className='text-xl font-bold mb-2'>Personal Information</h2>

        <input 
            name='fullName'
            placeholder='Full Name'
            value={cv.personal.fullName}
            onChange={handleChange}
            className='input'
        />

        <input 
            name='email'
            placeholder='Email'
            value={cv.personal.email}
            onChange={handleChange}
            className='input'
        />

        <input 
            name='phone'
            placeholder='Phone'
            value={cv.personal.phone}
            onChange={handleChange}
            className='input'
        />

        <input 
            name='linkedin'
            placeholder='LinkedIn'
            value={cv.personal.linkedin}
            onChange={handleChange}
            className='input'
        />

        <input 
            name='github'
            placeholder='GitHub'
            value={cv.personal.github}
            onChange={handleChange}
            className='input'
        />

    </div>
  )
}

export default PersonalForm