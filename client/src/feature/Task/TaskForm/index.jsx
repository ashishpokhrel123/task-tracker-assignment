import React, { useState } from "react";
import CustomInput from "../../../components/ui/Input";
import CustomButton from "../../../components/ui/Button";
import { addTask } from "../../../api/task";
import { notification } from "antd";


function TaskForm() {
  const [formData, setFormData] = useState({
    task: "",
  });

  const [errors, setErrors] = useState({
    task: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = {};

    if (!formData.task.trim()) {
      newErrors.task = "Task is required";
      formValid = false;
    } else {
      newErrors.task = "";
    }

    setErrors(newErrors);

    if (formValid) {
      try {
        await addTask(formData);
        notification.success({
          message: "Success",
          description: "Task added successfully!",
        });
        setFormData({
          task: "",
        });
         setTimeout(() => {
      window.location.reload(); 
    }, 1000)
      } catch (error) {
        notification.error({
          message: "Error",
          description: `Failed to add task: ${error.message}`,
        });
      }
    } else {
      notification.error({
        message: "Error",
        description: `Failed to add task: ${errors.message}`,
      });
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="max-w-lg mx-auto px-4">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-4">
            <div className="flex flex-col">
              <CustomInput
                type="text"
                label="Task"
                name="task"
                value={formData.task}
                onChange={handleChange}
                required
                className="mr-2"
              />
              {errors.task && (
                <p className="text-red-500 text-xs italic mt-1 ml-2">
                  {errors.task}
                </p>
              )}
            </div>

            <div className="self-end">
              <CustomButton
                type="submit"
                label="Add Task"
                className="h-[50px]"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
