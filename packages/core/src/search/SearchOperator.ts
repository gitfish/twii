enum SearchOperator {
    matchesPhrase = "matchesPhrase",
    matchesAnyTerm = "matchesAnyTerm",
    matchesAllTerms = "matchesAllTerms",
    beginsWith = "beginsWith",
    endsWith = "endsWith",
    // these apply to non-string values - i.e. numbers, dates and so on
    equals = "equals", 
    between = "between"
}

export { SearchOperator }