import { Schema, model, models } from 'mongoose'

const AppointmentSchema = new Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  doctor_name: { type: String, required: true },
  patient_name: String,
  phone: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true })

export default models.Appointment || model('Appointment', AppointmentSchema)