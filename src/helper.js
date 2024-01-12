export const isLocalStoragePopulated = JSON.parse(window.localStorage.getItem('data'))?.length > 0;

export const populateDummyData = (data) => {
  window.localStorage.setItem('data', JSON.stringify(data));
}

export const today = new Date().toISOString().split('T')[0];

export const validateString = (input) => {
  return input && typeof input === 'string' && input.trim() !== ""
};

export const formatDate = (dateString) => {
  if (!validateString(dateString)) {
    return today;
  } 
  return dateString.split('-').reverse().join('-');
}

export const dummyData = [
    {
      id: 1000,
      product: 'Tomatoes',
      useByDate: '2024-10-03',
    },
    {
      id: 2000,
      product: 'Bread',
      useByDate: '2024-05-05',
    },
    // {
    //   id: 3000,
    //   product: 'Butter',
    //   useByDate: '2024-03-24',
    // },
    // {
    //   id: 4000,
    //   product: 'Aubergine',
    //   useByDate: '2024-08-07',
    // },
  ]
  