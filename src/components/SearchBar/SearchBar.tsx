import css from './SearchBar.module.css';
import { Field, Form, Formik } from 'formik';
interface SearchBarProps {
  onSearch: (topic: string) => void;
}
export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Formik
      initialValues={{
        topic: '',
      }}
      onSubmit={(values, actions) => {
        onSearch(values.topic);
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <Field
          className={css.input}
          type="text"
          name="topic"
          placeholder="Введіть запит..."
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
}
