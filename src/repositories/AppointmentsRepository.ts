import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

// DTO - Data Transfer Object
// Obtemos métodos create, save, put e etc com o @entityrepository
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // Tranformamos o findeByDate em uma promisse para poder usarmos o async
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
