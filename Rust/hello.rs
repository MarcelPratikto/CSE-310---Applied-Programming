//import the necessary modules
use std::thread;
use std::time::Duration;
use cute::c;
use rand::Rng;

// Constants
const MAX_QUEUE_SIZE:u8 = 10;
const SLEEP_REDUCE_FACTOR:u8 = 50;
const FACTORY_FINISHED_MESSAGE:&str = "!done!";

// Car stuff
struct Car{
    model:String,
    make:String,
    year:u32
}
impl Car{
    let car_makes = [
        'Ford', 'Chevrolet', 'Dodge', 'Fiat', 'Volvo', 'Infiniti', 'Jeep', 'Subaru', 
        'Buick', 'Volkswagen', 'Chrysler', 'Smart', 'Nissan', 'Toyota', 'Lexus', 
        'Mitsubishi', 'Mazda', 'Hyundai', 'Kia', 'Acura', 'Honda'
    ];
    let car_models = [
        'A1', 'M1', 'XOX', 'XL', 'XLS', 'XLE' ,'Super' ,'Tall' ,'Flat', 'Middle', 'Round',
        'A2', 'M1X', 'SE', 'SXE', 'MM', 'Charger', 'Grand', 'Viper', 'F150', 'Town', 'Ranger',
        'G35', 'Titan', 'M5', 'GX', 'Sport', 'RX'
    ];
    let car_years = c![i, for i in range 1990..2022];
    
    fn init(&self){
        let mut rng = rand::thread_rng();
        self.make = car_makes[rng.gen_range(0..car_makes.len())].to_string();
        self.model = car_models[rng.gen_range(0..car_models.len())].to_string();
        self.year = car_years[rng.gen_range(0..car_years.len())];
    }

    fn display(&self){
        println!("{} {}, {}", self.make, self.model, self.year);
    }
}

// Queue stuff
struct Queue251{
    items:Vec<Car>,
    max_size:u32
}
impl Queue251{
    fn init(&self){
        self.items = vec![];
        self.max_size = 0;
    }
    fn get_max_size(&self){
        return self.max_size;
    }
    fn put(&self, item:Car){
        self.items.push(item);
        if self.items.len() > self.max_size{
            self.max_size = self.items.len();
        }
    }
    fn get(&self){
        return self.items.pop();
    }
}

struct Factory{
    cars_to_produce:u32,
    sem_available_slots:u32,
    car_queue:Vec<Queue251>,
    num_dealers:u32
}
impl Factory{
    fn init(&self, car_queue:Vec<Queue251>, sem_available_slots:u32, num_dealers:u32){
        let mut rng = rand::thread_rng();
        self.cars_to_produce = rng.gen_range(200..300);
        self.sem_available_slots = sem_available_slots;
        self.num_dealers = num_dealers;
    }
    fn run(&self){
        println!("PRODUCING {} CARS", self.cars_to_produce);
        for i in self.cars_to_produce{
            self.car_queue.put(Car.init());
        }
        println!("FINISHED MAKING CARS!!!");
        for i in 0..num_dealers{
            
        }
    }
}

// Run production
fn run_production(factory_count:i32, dealer_count:i32) -> (f32,u32,Vec<u32>,Vec<u32>){
    
    let mut dealer_stats = vec![0;dealer_count];
    let mut factory_stats = vec![0;factory_count];

    let dealer_index = 0;
    for dealer in dealers{
        dealer_stats[dealer_index] = dealer.cars_rev;
        dealer_index += 1;
    }
    //run_time = log.stop_timer(f'{sum(dealer_stats)} cars have been created')

    let factory_index = 0;
    for factory in factories{
        factory_stats[factory_index] = factory.cars_to_produce;
        factory_index += 1;
    }
    
    return (
        run_time,
        car_queue.get_max_size(),
        dealer_stats,
        factory_stats
    );
}

fn main(){
   let runs = [(1,1),(1,2),(2,1),(2,2)];
   for (factories, dealerships) in runs{
        let production_return = run_production(factories, dealerships);
        let run_time = production_return.0;
        let max_queue_size = production_return.1;
        let dealer_stats = production_return.2;
        let factory_stats = production_return.3;

        println!("Factories         : {}", factories);
        println!("Dealerships       : {}", dealerships);
        println!("Run Time          : {}", run_time);
        println!("Max Queue Size    : {}", max_queue_size);
        println!("Factory Stats     : {:?}", dealer_stats);
        println!("Dealer Stats      : {:?}", factory_stats);
        println!("");

        // number of cars produced must equal number of cars sold
        assert!(
            dealer_stats.iter().sum::<u32>()==factory_stats.iter().sum::<u32>(),
            "sum of dealer_stats != sum of factory_stats"
        );
   }
}