import axios from "axios"; // Importing axios for making HTTP requests
import React, { useEffect, useState } from "react"; // Importing React and hooks (useEffect, useState)
import { Button, Modal, Stack } from "react-bootstrap"; // Importing Bootstrap components for layout and modal styling
import toast from "react-hot-toast"; // Importing toast for displaying notifications (though not used in the current code)
import Cookies from "js-cookie"; // Importing js-cookie for cookie management (though not used in the current code)

// ViewTaskModal component to display task details in a modal
const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {
  // State to store task data, initialized as an empty array
  const [task, setTask] = useState([]);

  // useEffect hook to fetch a single task when the component is mounted or when `id` changes
  useEffect(() => {
    // Asynchronous function to fetch task data from the API
    const getSingleTask = async () => {
      await axios
        .get(`http://localhost:4000/task/single/${id}`, {
          withCredentials: true, // Send credentials (e.g., cookies) with the request
        })
        .then((res) => {
          setTask(res.data.task); // Update the `task` state with the response data
        })
        .catch((error) => {
          console.log(error.response.data.message); // Log any errors that occur during the request
        });
    };
    
    // Call the API if `id` is available (ensures the request is not made if there's no valid id)
    if (id) {
      getSingleTask();
    }
  }, [id]); // The effect depends on `id`, meaning it will re-run whenever `id` changes

  // JSX for rendering the modal with task details
  return (
    <>
      {/* Modal to display the task, showViewModal controls its visibility */}
      <Modal show={showViewModal} onHide={handleViewModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Task</Modal.Title> {/* Modal title */}
        </Modal.Header>
        <Modal.Body>
          {/* Stack for structured layout of task details */}
          <Stack>
            <p className="fw-bold mb-0">Title</p> {/* Label for task title */}
            <p>{task && task.title}</p> {/* Display task title if available */}
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Description</p> {/* Label for task description */}
            <p>{task && task.description}</p> {/* Display task description if available */}
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          {/* Button to close the modal */}
          <Button variant="secondary" onClick={handleViewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewTaskModal; // Exporting the ViewTaskModal component
