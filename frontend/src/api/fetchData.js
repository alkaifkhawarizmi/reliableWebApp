import axios from 'axios'

const BASE_URL = import.meta.env

export async function gettAllMedia() {
  try {
    
    const res = await axios.get(BASE_URL.VITE_BASE_ADMIN_ALL_MEDIA)

    if(res.status === 200){
      return res.data
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "An error occurred while fetching media",
      error: error.message,
    });
  }
}