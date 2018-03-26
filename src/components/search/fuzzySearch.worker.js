import fuzzy from 'fuzzy';

// Respond to message from parent thread
self.addEventListener('message', (event) => {
    const {
        persons,
        records,
        query
    } = event.data;

    const personResults = fuzzy.filter(query, persons, {
        extract: (person) => {
          return person.name;
        }
      }).map(el => el.original);
  
      const recordResults = fuzzy.filter(query, records, {
        extract: (record) => {
          return `${record.key}: ${record.value}`
        }
      }).map(el => el.original);

    self.postMessage({
        personResults,
        recordResults
    });
});
