import React, { Component } from "react";
import styles from "./NewCompetitionPage.module.css";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import Button from "../../components/Button/Button";
import ImageDrop from "../../components/ImageDrop/ImageDrop";
import { isEmpty } from "lodash";

import { withRouter } from "react-router";
import HttpService from "../../services/HttpService";
import { HOME } from "../../const/routes";

class NewCompetitionPage extends Component {
  onSubmit = (values) => {
    values.friends = values.friends.filter((item) => item.username !== "");
    console.log(values.image);
    HttpService.createCompetition(
      values.title,
      values.description,
      values.category,
      values.image,
      values.friends
    )
      .then(() => this.props.history.push(HOME))
      .catch(console.error);
  };

  render() {
    const test = <label htmlFor={"title"}>Your competition title</label>;

    return (
      <main className={styles.column}>
        <h1 className={styles.header}>
          Add new competition and send invitation to your friends
        </h1>
        <Formik
          initialValues={{
            title: "",
            category: "",
            description: "",
            image: "",
            friends: [{ username: "" }],
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Title is required";
            }
            if (!values.category) {
              errors.category = "Category is required";
            }
            if (!values.description) {
              errors.description = "Description is required";
            }
            if (!values.image) {
              errors.image = "Image is required";
            }
            if (
              isEmpty(values.friends) ||
              values.friends[0].username === "" ||
              !values.friends[0].username
            ) {
              errors.friends = "Friends list cannot be empty";
            }
            return errors;
          }}
          onSubmit={(values) => this.onSubmit(values)}
        >
          {({
            values,
            handleSubmit,
            setFieldValue,
            handleChange,
            handleBlur,
          }) => (
            <Form onSubmit={handleSubmit} className={styles.column}>
              <div className={styles.row}>
                <div className={styles.columnLeft}>
                  <div className={styles.inputContainer}>
                    <label htmlFor={"title"} className={styles.label}>
                      Write your competition&apos;s title
                    </label>
                    <Field
                      label={test}
                      id={"title"}
                      name={"title"}
                      placeholder={"Title"}
                      className={styles.input}
                    />
                    <p className={styles.error}>
                      <ErrorMessage name="title" />
                    </p>
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor={"category"} className={styles.label}>
                      Select category from below
                    </label>
                    <Field
                      as="select"
                      id={"category"}
                      name={"category"}
                      className={styles.input}
                    >
                      <option value="default" disabled>
                        Choose category
                      </option>
                      <option value="physical">Physical</option>
                      <option value="riddles">Riddles</option>
                      <option value="challenges">Challenges</option>
                    </Field>
                    <p className={styles.error}>
                      <ErrorMessage name="category" className={styles.error} />
                    </p>
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor={"description"} className={styles.label}>
                      Your description should contain simple rules and tutorial
                      how to do things properly.
                    </label>
                    <textarea
                      id={"description"}
                      rows={3}
                      cols={50}
                      name={"description"}
                      onChange={handleChange}
                      value={values.description}
                      placeholder={"Description"}
                      onBlur={handleBlur}
                      className={styles.input}
                    />
                    <p className={styles.error}>
                      <ErrorMessage name="description" />
                    </p>
                  </div>
                  <div className={styles.inputContainer}>
                    <h1 className={styles.header}>Send invitations :</h1>
                    <FieldArray name={"friends"}>
                      {({ remove, push }) => (
                        <div>
                          {values.friends.length > 0 &&
                            values.friends.map((friend, index) => (
                              <div
                                key={index}
                                className={styles.friendContainer}
                              >
                                <label
                                  htmlFor={`friends.${index}.username`}
                                  className={styles.label}
                                >
                                  Your friend&apos;s username
                                </label>
                                <Field
                                  name={`friends.${index}.username`}
                                  placeholder="Username"
                                  type="text"
                                />
                                <Button
                                  outline
                                  type="button"
                                  onClick={() => remove(index)}
                                  text={"Remove"}
                                  className={styles.marginTop}
                                />
                              </div>
                            ))}
                          <Button
                            type="button"
                            outline
                            onClick={() => push({ username: "" })}
                            text={"Add Friend"}
                          />
                        </div>
                      )}
                    </FieldArray>
                    <p className={styles.error}>
                      <ErrorMessage name={`friends`} />
                    </p>
                  </div>
                </div>
                <div className={styles.columnRight}>
                  <ImageDrop
                    className={styles.imageDropzone}
                    setFieldValue={setFieldValue}
                    value={values.image}
                  />
                  <p className={styles.error}>
                    <ErrorMessage name="image" />
                  </p>
                  <div>
                    <h1 className={styles.header}>Invited friends:</h1>
                    <ul className={styles.list}>
                      {values.friends.map((friend, index) => (
                        <li key={index}>{friend.username}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <button type={"submit"} className={styles.button}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </main>
    );
  }
}

export default withRouter(NewCompetitionPage);
