import { useState, useEffect } from 'react';
import { IoSparklesOutline, IoSparkles } from "react-icons/io5";
import { PrimaryButton } from '@workday/canvas-kit-react/button';
import { FormField } from '@workday/canvas-kit-react/form-field';
import { TextInput } from '@workday/canvas-kit-react/text-input';
import { Select } from '@workday/canvas-kit-react/select';

const WDGen = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({ field: '', type: 'text' });
  const [prismTable, setPrismTable] = useState('');
  const [accountingSource, setAccountingSource] = useState('');
  const [recordsCount, setRecordsCount] = useState(10);
  const [showSparkle, setShowSparkle] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRow = () => {
    setRecords([...records, formData]);
    setFormData({ field: '', type: 'text' });
  };

  const handleDeleteLast = () => {
    setRecords(records.slice(0, -1));
  };

  const handleDeleteAll = () => {
    setRecords([]);
  };

  const handleGenerate = () => {
    setIsAnimating(true);
    setShowSparkle(true);
    setRecords([]);

    const interval = setInterval(() => {
      setShowSparkle(prev => !prev);
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setIsAnimating(false);
      setShowSparkle(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'prismTable') setPrismTable(value);
    else if (name === 'accountingSource') setAccountingSource(value);
    else if (name === 'recordsCount') setRecordsCount(Number(value));
  };

  return (
    <section className="content">
      <div>
        <h1>Workday Generate</h1>
      </div>

      <FormField class="field" label="Field Name">
        <TextInput name="field" value={formData.field} onChange={handleChange} />
      </FormField>
      <FormField label="Data Type">
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="text">Text</option>
          <option value="numeric">Numeric</option>
          <option value="boolean">Boolean</option>
          <option value="worktag">Worktag</option>
        </select>
      </FormField>
      <div>
        <PrimaryButton class="btn" onClick={handleAddRow} size="large">Add Row</PrimaryButton>
        <PrimaryButton class="btn" onClick={handleDeleteLast} size="large">Delete Last</PrimaryButton>
        <PrimaryButton class="btn" onClick={handleDeleteAll} size="large">Delete All</PrimaryButton>
      </div>
      <pre class="code-output"><code className="json">{JSON.stringify(records, null, 2)}</code></pre>

      <FormField class="field" label="Prism Table">
        <TextInput name="prismTable" value={prismTable} onChange={handleInputChange} />
      </FormField>
      <FormField class="field" label="Accounting Source">
        <TextInput name="accountingSource" value={accountingSource} onChange={handleInputChange} />
      </FormField>
      <FormField class="field" label="Records">
        <TextInput type="number" name="recordsCount" value={recordsCount} onChange={handleInputChange} />
      </FormField>
      <div>
        <PrimaryButton class="btn" onClick={handleGenerate} size="large">
          Generate {isAnimating ? (showSparkle ? <IoSparkles /> : <IoSparklesOutline />) : <IoSparklesOutline />}
        </PrimaryButton>
      </div>
    </section>
  );
};

export default WDGen;


