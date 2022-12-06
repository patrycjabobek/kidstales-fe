import React, { useState } from "react";
import styled from "styled-components";
import styles from "./author-material-item.module.scss";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

import Popup from "reactjs-popup";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";

const StyledPopupEditor = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.5);
  }

  &-content {
    position: relative;
    width: 1000px !important;
    height: 500px !important;
    padding: 0;
    z-index: 999;
    pointer-events: auto;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
  }

  &-arrow {
    width: 0;
  }

  [role="tooltip"].&-content {
    width: 200px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 0 3px;
  }
`;
const StyledPopupDelete = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.5);
  }

  &-content {
    position: relative;
    width: 400px !important;
    padding: 0;
    color: #4753bc;
    z-index: 999;
    pointer-events: auto;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
  }

  &-arrow {
    width: 0;
  }

  [role="tooltip"].&-content {
    width: 200px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 0 3px;
  }
`;

export default function AuthorMaterialItem(props) {
  const { id, title, price, description, category } = props.material;
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
    }
  };

  const handleMaterialDeletion = async (e) => {
    e.preventDefault();

    try {
      await deleteDoc(doc(db, "materials", id));
      console.log("Usunięto", id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);
    }
  };

  return (
    <tr key={id} className={styles.materialItem}>
      <td className={styles.materialItemDetails}>
        <div className={styles.materialTitle}>{title}</div>
      </td>
      <td className={styles.actionBox}>
        <StyledPopupEditor
          trigger={
            <button>
              <EditIcon className={styles.icon} />
            </button>
          }
          className="editBtn"
        >
          {(close) => (
            <div>
              <div className={styles.editBtnHeader}>
                <div className={styles.materialEditHeader}>
                  <div className={styles.close}>
                    <CloseIcon onClick={close} />
                  </div>
                  <h3>Edytuj utwór</h3>
                  <Button variant="contained">Zapisz</Button>
                </div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.editBtnEditor}>
                <form onDragEnter={handleDrag} className={styles.formEditor}>
                  <div className={styles.col1}>
                    <div className={styles.formGroup}>
                      <label htmlFor="title">Tytuł</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={title}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="description">Opis</label>
                      <textarea
                        rows={17}
                        id="description"
                        name="description"
                        className="description-area"
                        defaultValue={description}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.col2}>
                    <div className={styles.formGroup}>
                      <label htmlFor="title">Cena</label>
                      <input
                        type="number"
                        min="0.00"
                        max="10000.00"
                        step="0.01"
                        id="title"
                        defaultValue={price}
                        name="title"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="category">Kategoria</label>
                      <select id="category" defaultValue={category}>
                        <option value="stories">Opowiadania</option>
                        <option value="cartoons">Bajki</option>
                        <option value="songs">Piosenki</option>
                        <option value="other">Inne</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.col3} id="form-file-upload">
                    <div className={styles.formGroup}>
                      <label htmlFor="file" className={styles.labelForm}>
                        Materiał
                      </label>
                      <input
                        type="file"
                        id="input-file-upload"
                        onChange={handleChange}
                      />
                    </div>
                    {/* <label id="label-file-upload" htmlFor="input-file-upload">
                      <div>
                        <p>Drag and drop your file here or</p>
                        <button className={styles.uploadButton}>
                          Upload a file
                        </button>
                      </div>
                    </label> */}
                  </div>
                  {dragActive && (
                    <div
                      id="drag-file-element"
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    ></div>
                  )}
                </form>
              </div>
            </div>
          )}
        </StyledPopupEditor>
        <StyledPopupDelete
          trigger={
            <button>
              <DeleteIcon className={styles.icon} />
            </button>
          }
        >
          {(close) => (
            <div>
              <div className={styles.close}>
                <CloseIcon onClick={close} />
              </div>
              <div className={styles.center}>
                <div>
                  <DeleteIcon />
                  <h3>Usuń utwór</h3>
                </div>
                <div className={styles.deleteActions}>
                  <p>Ta akcja spowoduje jego trwałe usunięcie </p>
                  <Button
                    variant="outlined"
                    sx={{
                      border: "1px solid #4753BC",
                      color: "#4753BC",
                      background: "#fff",
                      "&:hover": {
                        "background-color": "rgba(71,83,188,0.2)",
                        border: "1px solid #4753BC",
                      },
                    }}
                    onClick={close}
                  >
                    Anuluj
                  </Button>
                  <Button
                    onClick={handleMaterialDeletion}
                    variant="contained"
                    sx={{
                      background: "#4753BC",
                      "&:hover": {
                        "background-color": "rgba(71,83,188,0.8)",
                      },
                    }}
                  >
                    Tak, usuń
                  </Button>
                </div>
              </div>
            </div>
          )}
        </StyledPopupDelete>
      </td>
    </tr>
  );
}
