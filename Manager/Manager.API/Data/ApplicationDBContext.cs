using Manager.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Manager.API.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Rooms> Rooms { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<RoomRate> RoomRates { get; set; }
        public DbSet<Services> Services { get; set; }
        public DbSet<Discount> Discounts { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Rooms>()
                .HasOne(r => r.RoomType)
                .WithMany(rt => rt.Rooms)
                .HasForeignKey(r => r.RoomTypeId);

            modelBuilder.Entity<RoomRate>()
                .HasOne(rr => rr.RoomType)
                .WithMany(rt => rt.RoomRates)
                .HasForeignKey(rr => rr.RoomTypeId);

            modelBuilder.Entity<RoomRate>()
                .Property(p => p.Price)
                .HasPrecision(10, 2);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "Manager", NormalizedName = "MANAGER" },
                new IdentityRole { Name = "Guest", NormalizedName = "GUEST" }
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);


        }

    }

}
