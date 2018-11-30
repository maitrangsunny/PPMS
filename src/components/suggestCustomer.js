import Autosuggest from "react-autosuggest";
import Modal from "react-modal";
import React, { Component } from "react";

// Imagine you have a list of languages that you'd like to autosuggest.

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

const theme = {
  container: {
    position: "relative",
  },
  input: {
    height: 30,
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    border: "1px solid #aaa",
  },
  inputFocused: {
    outline: "none",
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  suggestionsContainer: {
    display: "none",
  },
  suggestionsContainerOpen: {
    display: "block",
    position: "absolute",
    top: 51,
    width: 280,
    border: "1px solid #aaa",
    backgroundColor: "#fff",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    maxHeight: 200,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2,
    overflow: "auto",
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  suggestion: {
    cursor: "pointer",
    padding: "10px 20px",
  },
  suggestionHighlighted: {
    backgroundColor: "#ddd",
  },
};

export default class Example extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.props.languages.filter(
          lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.props.dataReturn(suggestion);
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Tên Khách Hàng",
      value: this.props.value || value,
      onChange: this.onChange,
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={value =>
          this.onSuggestionsFetchRequested(value)
        }
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={this.props.theme || theme}
        highlightFirstSuggestion={true}
        onSuggestionSelected={this.onSuggestionSelected}
        renderInputComponent={inputProps =>
          this.props.renderInputComponent(inputProps)
        }
      />
    );
  }
}
