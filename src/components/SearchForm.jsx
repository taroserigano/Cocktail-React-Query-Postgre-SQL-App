import Wrapper from "../assets/wrappers/SearchForm";
import { Form, useNavigation } from "react-router-dom";
import { useEffect, useRef } from "react";

const SearchForm = ({ searchTerm }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleInput = (e) => {
      if (e.target.name === "search") {
        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set new timeout for debounce - 400ms for smoother typing
        timeoutRef.current = setTimeout(() => {
          formRef.current?.requestSubmit();
        }, 400);
      }
    };

    const form = formRef.current;
    form?.addEventListener("input", handleInput);

    return () => {
      form?.removeEventListener("input", handleInput);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Wrapper>
      <Form className="form" ref={formRef}>
        <input
          type="search"
          name="search"
          className="form-input"
          defaultValue={searchTerm}
          placeholder="Search cocktails..."
        />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "searching..." : "search"}
        </button>
      </Form>
    </Wrapper>
  );
};
export default SearchForm;
