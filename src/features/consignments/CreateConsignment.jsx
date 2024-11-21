import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
  styled,
  TextField,
} from "@mui/material";
import useStore from "../../app/store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
export default function CreateConsignment() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const autocompleteRef = useRef(null);
  const createNewConsignment = useStore((state) => state.createNewConsignment);
  const isLoading = useStore((state) => state.isLoading);
  const auth = useStore((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllInventories = useStore((state) => state.getAllInventories);
  const inventories = useStore((state) => state.inventories);
  
  console.log(inventories);
  useEffect(() => {
    getAllInventories();
  }, [getAllInventories]);

  const options =
    inventories?.data?.$values.map((inventory) => ({
      key: inventory.inventoryId,
      label: inventory.inventoryName,
    })) || [];

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  return (
    <>
      {auth && (
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "#FF204E",
            "&:hover": {
              backgroundColor: "#FF204E",
            },
          }}
        >
          Post new koi
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            //selectedInventory
            const selectedInventory =
              autocompleteRef.current?.querySelector("input").value;
            const selectedOption = options.find(
              (option) => option.label === selectedInventory
            );

            Array.from(selectedFile).forEach((file) => {
              formData.append("Image", file);
            });

            const formJson = Object.fromEntries(formData.entries());
            formJson.inventoryId = selectedOption ? selectedOption.key : null;

            formData.append("InventoryName", formJson.InventoryName);
            formData.append("Quantity", formJson.Quantity);
            console.log("data", formJson);

            useStore.setState({ response: null, error: null });
            if (selectedFile.length > 0) {
              await createNewConsignment(formData);
            } else {
              toast.error("Please upload at lease one image");
              return;
            }

            const response = useStore.getState().response;
            const error = useStore.getState().error;
            console.log("response", response);
            console.log("error", error);
            if (!error) {
              setSelectedFile([]);
              toast.success(
                "Consignment created successfully. Please wait for approval."
              );
            } else {
              toast.error(error.message);
              // toast.error(error);
            }

            handleClose();
          },
        }}
      >
        <DialogTitle> Create new Koi </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="origin"
            name="Origin"
            label="Origin"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="gender"
            name="Gender"
            label="Gender"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="age"
            name="Age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="price"
            name="Price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="size"
            name="Size"
            label="Size"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="breed"
            name="Breed"
            label="Breed"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="Description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="quantity"
            name="Quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
          />
          <Autocomplete
            disablePortal
            id="autocomplete"
            options={options}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Inventory"
                variant="standard"
                required
                ref={autocompleteRef}
              />
            )}
          />
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{
              marginTop: 1,
              backgroundColor: "white",
              border: "1px solid black",
              color: "black",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            Upload Images
            <VisuallyHiddenInput
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile?.length > 0 && (
            <ImageList cols={3} rowHeight={164}>
              {Array.from(selectedFile).map((item, index) => {
                const url = URL.createObjectURL(item);
                return (
                  <ImageListItem key={index} sx={{ width: 164, height: 164 }}>
                    <img src={url} alt={`file-${index}`} loading="lazy" />
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={isLoading}
            sx={{
              color: "white",
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            Cancel
          </Button>
          {(isLoading && <CircularProgress />) || (
            <Button
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "#FF204E",
                "&:hover": {
                  backgroundColor: "#FF204E",
                },
              }}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
