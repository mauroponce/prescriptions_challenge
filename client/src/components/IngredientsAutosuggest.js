import React from 'react';
import Autosuggest from 'react-autosuggest';

const data = [
  {
    title: 'Ingredients',
    items: [
      {
        id: 1,
        name: 'Allantoin',
        minimum: 1,
        maximum: 2,
        description: 'Some Allantoin'
      },
      {
        id: 2,
        name: 'Aloe',
        minimum: 1,
        maximum: 2,
        description: 'Some Aloe'
      },
      {
        id: 9,
        name: 'Caffeine',
        minimum: 0.5,
        maximum: 1.5,
        description: 'Some coffee'
      },
    ]
  },
  {
    title: 'Formulations',
    items: [
      {
        name: 'A Crema 1',
        description: 'Aloe, Caffeine', // sacar esto si puedo encontrarlos por id y no hago el join
        ingredient_ids: [2, 9]
      },
      {
        name: 'Crema 2',
        description: 'Allanto, Aloe',
        ingredient_ids: [1, 2]
      }
    ]
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  return data.map(section => {
    return {
      title: section.title,
      items: section.items.filter(item => regex.test(item.name))
    };
  })
    .filter(section => section.items.length > 0);
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  const isFormulation = 'ingredient_ids' in suggestion;
  if (isFormulation) {
    suggestion.description = concatIngredientNames(suggestion.ingredient_ids);
  }
  return (
    <div>
      <div>{suggestion.name}</div>
      <small>{suggestion.description}</small>
    </div>
  );
}

function concatIngredientNames(ingredientIds) {
  const ingredientsSection = data[0];
  return ingredientsSection.items
    .filter(item => ingredientIds.includes(item.id))
    .map(item => item.name).join(', ')
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.items;
}

class IngredientsAutosuggest extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    debugger
    this.props.onSuggestionSelected();
  }

  render() {
    const { placeholder } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)} />
    );
  }
}

export default IngredientsAutosuggest;