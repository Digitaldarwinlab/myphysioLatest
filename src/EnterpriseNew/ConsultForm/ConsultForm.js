import "./ConsultForm.css"


const ConsultForm = () => {
    return <div class="Formdiv">
    <form>
        <label>
            Occupation
        </label>
        <select>
        <option selected></option>
                        <option value="Desk Job">Desk Job</option>
                        <option value="Standing">Standing</option>
                        <option value="Field Work">Field Work</option>
        </select>
        <h3>
            Duration
        </h3>
       
       <input type="radio" name="duaration"></input>
       <label>0-4 hours</label>
       <input type="radio" name="duaration"></input>
       <label>0-8 hours</label>
       <input type="radio" name="duaration"></input>
       <label>Above  8</label>
       <input type="radio" name="duaration"></input>
       <label>Flexible</label>
        <h3>History Of Presenting Complaint</h3>
        <input type="radio" name="history_present"></input>
        
        <label>Gradual</label>
        <input type="radio" name="history_present"></input>
        <label>Sudden</label>
        
        <input type="radio" name="history_present"></input>
        <label>History of Fall</label>
        
        <input type="radio" name="history_present"></input>
        <label>Any other injury</label>
       <h3>Past Medical History</h3>
       <input type="checkbox" name="past_medical_history"></input>
       <label>Diabetes</label>
       <input type="checkbox" name="past_medical_history"></input>
       <label>HYN</label>
       <input type="checkbox" name="past_medical_history"></input>
       <label>COPD</label>
       <input type="checkbox" name="past_medical_history"></input>
       <label>Cardiac</label>
       <input type="checkbox" name="past_medical_history"></input>
       <label>Medication</label>
       <input type="checkbox" name="past_medical_history"></input>
       <label>Others</label>
       <h3>Built Type</h3>
       <input type="radio" name="build_type"></input>
       <label>Ectomorphic</label>
       <input type="radio" name="build_type"></input>
       <label>Mesomorphic</label>
       <input type="radio" name="build_type"></input>
       <label>Endomorphic</label>
       
       
    </form>
    </div>

}

export default ConsultForm;